import { logger } from "../config/logger";
import { Brand } from "../models/brand.model";
import { Review } from "../models/review.model";
import { CreateReviewDto } from "../types/review/review-create.dto";
import { UpdateReviewDto } from "../types/review/review-update.dto";
import { AppError } from "../utils/AppError";
import { BrandService } from "./brand.service";

class ReviewServiceClass {
    async createReview(payload: CreateReviewDto, brandId: string, userId: string) {
        try {
            const brandFound = await BrandService.getBrand(brandId)

            if (!brandFound) {
                logger.error(`Brand not found with id: ${brandId}`)
                throw new AppError(`Brand not found with id: ${brandId}`, 404)
            }

            // Check if brand has been launched for at least 7 days
            if (brandFound.launchAt) {
                const launchDate = new Date(brandFound.launchAt);
                const currentDate = new Date();
                const daysSinceLaunch = Math.floor((currentDate.getTime() - launchDate.getTime()) / (1000 * 60 * 60 * 24));

                if (daysSinceLaunch < 7) {
                    logger.error(`Cannot review brand ${brandId} - only ${daysSinceLaunch} days since launch. Must wait ${7 - daysSinceLaunch} more days.`)
                    throw new AppError(`Reviews can only be submitted 7 days after the brand launch date. Please wait ${7 - daysSinceLaunch} more days.`, 400)
                }
            }

            const isReviewExists = await Review.exists({
                brandId: brandId,
                userId: userId
            })

            if (isReviewExists) {
                logger.error(`Review already exists for this user and brand`)
                throw new AppError(`Review already exists for this user and brand`, 409)
            }

            const reviewCreated = await Review.create({
                ...payload,
                userId,
                brandId
            })

            await Brand.findByIdAndUpdate(brandId, {
                $inc: {
                    recommendCount: payload.recommendation === "recommend" ? 1 : 0,
                    notRecommendCount: payload.recommendation === "not_recommend" ? 1 : 0,
                    reviewCount: 1
                }
            })

            return reviewCreated
        } catch (error) {
            console.error(`Error Creating Review: ${error}`)
            logger.error(`Error Creating Review: ${error}`)
            throw new AppError(`Error Creating Review`, 500)
        }
    }
    async getAllReview(brandId: string) {
        try {
            const brandFound = await BrandService.getBrand(brandId)

            if (!brandFound) {
                logger.error(`Brand not found with id: ${brandId}`)
                throw new AppError(`Brand not found with id: ${brandId}`, 404)
            }

            const reviews = await Review.find({
                brandId: brandId
            }).populate("userId", "username profile_url").populate("brandId", "name slug").lean()

            return reviews
        } catch (error) {
            console.error(`Error to get all Reviews: ${error}`)
            logger.error(`Error to get all Reviews: ${error}`)
            throw new AppError(`Error to get all Reviews`, 500)
        }
    }
    async getReview(reviewId: string) {
        try {
            const getReview = await Review.findById(reviewId)
            return getReview
        } catch (error) {
            console.error(`Error to get Review: ${error}`)
            logger.error(`Error to get Review: ${error}`)
            throw new AppError(`Error to get Review`, 500)
        }
    }
    async getUserReview(userId: string) {
        try {
            const reviews = await Review.find({
                userId
            })
            return reviews
        } catch (error) {
            console.error(`Error in getting all reviews: ${error}`)
            logger.error(`Error in getting all reviews: ${error}`)
            throw new AppError(`Error in getting all reviews`, 500)
        }
    }
    async updateReview(reviewId: string, userId: string, payload: UpdateReviewDto) {
        try {
            const foundReview = await Review.findById(reviewId)
            if (!foundReview) {
                logger.error(`Review not found with id: ${reviewId}`)
                throw new AppError(`Review not found with id: ${reviewId}`, 404)
            }
            if (String(foundReview.userId) !== userId) {
                logger.error(`Failed to update review with id: ${reviewId} due to user mismatch`)
                throw new AppError(`Failed to update review with id: ${reviewId} due to user mismatch`, 404)
            }
            const updatedReview = await Review.findByIdAndUpdate(reviewId, {
                ...payload,
                isEdited: true,
            }, {
                new: true,
                runValidators: true
            }).lean()
            if (!updatedReview) {
                logger.error(`Failed to update review: ${updatedReview}`)
                throw new AppError(`Failed to update review: ${updatedReview}`, 500)

            }
            return updatedReview._id
        } catch (error) {
            console.error(`Error to update Review: ${error}`)
            logger.error(`Error to update Review: ${error}`)
            throw new AppError(`Error to update Review`, 500)
        }
    }
    async increaseHelpfulReview(reviewId: string, userId: string) {
        try {
            const foundReview = await Review.findById(reviewId)
            if (!foundReview) {
                logger.error(`Review not found with id: ${reviewId}`)
                throw new AppError(`Review not found with id: ${reviewId}`, 404)
            }

            if (foundReview.helpful.some(id => id.toString() === userId)) {
                logger.error(`You already marked this review as helpful`)
                throw new AppError("You already marked this review as helpful", 400);
            }

            const updatedReview = await Review.findByIdAndUpdate(reviewId, {
                $addToSet: {
                    helpful: userId
                },
                $inc: {
                    helpfulCount: 1
                }
            }, {
                new: true,
                runValidators: true
            })
            
            if (!updatedReview) {
                console.error(`Error to increase helpful review: ${reviewId}`)
                logger.error(`Error to increase helpful review: ${reviewId}`)
                throw new AppError(`Error to increase helpful review`, 500)
            }
            
            logger.info(`Review ${reviewId} marked as helpful by user ${userId}`)
            return updatedReview._id
        } catch (error) {
            console.error(`Error to increase helpful review: ${error}`)
            logger.error(`Error to increase helpful review: ${error}`)
            throw error
        }
    }
    async decreaseHelpfulReview(reviewId: string, userId: string) {
        try {
            const foundReview = await Review.findById(reviewId)
            if (!foundReview) {
                logger.error(`Review not found with id: ${reviewId}`)
                throw new AppError(`Review not found with id: ${reviewId}`, 404)
            }

            // Fix: Check if user has NOT marked as helpful (should be !some, not find !== )
            if (!foundReview.helpful.some(id => id.toString() === userId)) {
                logger.error(`You never marked this review as helpful`)
                throw new AppError("You never marked this review as helpful", 400);
            }

            const updatedReview = await Review.findByIdAndUpdate(reviewId, {
                $pull: {
                    helpful: userId
                },
                $inc: {
                    helpfulCount: -1
                }
            }, {
                new: true,
                runValidators: true
            })
            
            if (!updatedReview) {
                console.error(`Error to decrease helpful review: ${reviewId}`)
                logger.error(`Error to decrease helpful review: ${reviewId}`)
                throw new AppError(`Error to decrease helpful review`, 500)
            }
            
            logger.info(`Review ${reviewId} unmarked as helpful by user ${userId}`)
            return updatedReview._id
        } catch (error) {
            console.error(`Error to decrease helpful review: ${error}`)
            logger.error(`Error to decrease helpful review: ${error}`)
            throw error
        }
    }
    async deleteReview(reviewId: string, userId: string) {
        try {
            const foundReview = await Review.findById(reviewId)
            if (!foundReview) {
                logger.error(`Review not found with id: ${reviewId}`)
                throw new AppError(`Review not found with id: ${reviewId}`, 404)
            }
            if (foundReview.userId !== userId) {
                logger.error(`Failed to delete review with id: ${reviewId} due to user mismatch`)
                throw new AppError(`Failed to delete review with id: ${reviewId} due to user mismatch`, 404)
            }
            await Review.findByIdAndDelete(reviewId)

            return "Review Deleted Successfully"
        } catch (error) {
            console.error(`Error in delete Review: ${error}`)
            logger.error(`Error in delete Review: ${error}`)
            throw new AppError(`Error in delete Review`, 500)
        }
    }
}

export const ReviewService = new ReviewServiceClass()