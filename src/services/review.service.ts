import { logger } from "../config/logger";
import { Brand } from "../models/brand.model";
import { Review } from "../models/review.model";
import { CreateReviewDto } from "../types/review/review-create.dto";
import { AppError } from "../utils/AppError";
import { BrandService } from "./brand.service";

class ReviewService {
    async createReview(payload: CreateReviewDto, brandId: string, userId: string) {
        try {
            const brandFound = await BrandService.getBrand(brandId)

            if (!brandFound) {
                logger.error(`Brand not found with id: ${brandId}`)
                throw new AppError(`Brand not found with id: ${brandId}`, 404)
            }

            const isReviewExists = await Review.exists({
                brandId: brandId,
                userId: userId
            })

            if (!isReviewExists) {
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
            })

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
}