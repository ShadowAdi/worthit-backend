import { logger } from "../config/logger.js";
import { AppError } from "../utils/AppError.js";
import { ReviewService } from "../services/review.service.js";
class ReviewControllerClass {
    async createReview(req, res, next) {
        try {
            const userId = req.user?.id;
            const { brandId } = req.params;
            if (!userId) {
                logger.error(`User ID not found in request`);
                console.error(`User ID not found in request`);
                throw new AppError("User ID not found in request", 400);
            }
            const payload = req.body;
            const newReview = await ReviewService.createReview(payload, brandId, userId);
            logger.info(`Review created successfully: ${newReview._id}`);
            console.log(`Review created successfully: ${newReview._id}`);
            res.status(201).json({
                success: true,
                message: "Review created successfully",
                data: newReview,
            });
        }
        catch (error) {
            logger.error(`Failed to create Review controller: ${error.message}`);
            console.error(`Failed to create Review controller: ${error.message}`);
            next(error);
        }
    }
    async getAllReviews(req, res, next) {
        try {
            const { brandId } = req.params;
            const reviews = await ReviewService.getAllReview(brandId);
            logger.info(`Reviews retrieved successfully for brand: ${brandId}`);
            console.log(`Reviews retrieved successfully for brand: ${brandId}`);
            res.status(200).json({
                success: true,
                message: "Reviews retrieved successfully",
                reviews: reviews,
            });
        }
        catch (error) {
            logger.error(`Failed to get Reviews controller: ${error.message}`);
            console.error(`Failed to get Review controller: ${error.message}`);
            next(error);
        }
    }
    async getReview(req, res, next) {
        try {
            const { reviewId } = req.params;
            const review = await ReviewService.getReview(reviewId);
            logger.info(`Review retrieved successfully: ${reviewId}`);
            console.log(`Review retrieved successfully: ${reviewId}`);
            res.status(200).json({
                success: true,
                message: "Review retrieved successfully",
                review: review,
            });
        }
        catch (error) {
            logger.error(`Failed to get Review controller: ${error.message}`);
            console.error(`Failed to get Review controller: ${error.message}`);
            next(error);
        }
    }
    async updateReview(req, res, next) {
        try {
            const userId = req.user?.id;
            const { reviewId } = req.params;
            const payload = req.body;
            if (!userId) {
                logger.error(`User ID not found in request`);
                console.error(`User ID not found in request`);
                throw new AppError("User ID not found in request", 400);
            }
            const reviewUpdatedId = await ReviewService.updateReview(reviewId, userId, payload);
            res.status(200).json({
                success: true,
                message: "Review updated successfully",
                reviewId: reviewUpdatedId,
            });
        }
        catch (error) {
            logger.error(`Failed to update Review controller: ${error.message}`);
            console.error(`Failed to update Review controller: ${error.message}`);
            next(error);
        }
    }
    async deleteReview(req, res, next) {
        try {
            const userId = req.user?.id;
            const { reviewId } = req.params;
            if (!userId) {
                logger.error(`User ID not found in request`);
                console.error(`User ID not found in request`);
                throw new AppError("User ID not found in request", 400);
            }
            const successMessage = await ReviewService.deleteReview(reviewId, userId);
            res.status(200).json({
                success: true,
                message: successMessage,
            });
        }
        catch (error) {
            logger.error(`Failed to delete Review controller: ${error.message}`);
            console.error(`Failed to delete Review controller: ${error.message}`);
            next(error);
        }
    }
    async getUserReview(req, res, next) {
        try {
            const { userId } = req.params;
            if (!userId) {
                logger.error(`User ID not found in request`);
                console.error(`User ID not found in request`);
                throw new AppError("User ID not found in request", 400);
            }
            const reviews = await ReviewService.getUserReview(userId);
            logger.info(`User reviews retrieved successfully: ${userId}`);
            console.log(`User reviews retrieved successfully: ${userId}`);
            res.status(200).json({
                success: true,
                message: "User reviews retrieved successfully",
                reviews: reviews,
            });
        }
        catch (error) {
            logger.error(`Failed to get user reviews controller: ${error.message}`);
            console.error(`Failed to get user reviews controller: ${error.message}`);
            next(error);
        }
    }
    async increaseHelpfulReview(req, res, next) {
        try {
            const userId = req.user?.id;
            const { reviewId } = req.params;
            if (!userId) {
                logger.error(`User ID not found in request`);
                console.error(`User ID not found in request`);
                throw new AppError("User ID not found in request", 400);
            }
            const updatedReviewId = await ReviewService.increaseHelpfulReview(reviewId, userId);
            logger.info(`Review marked as helpful: ${reviewId} by user: ${userId}`);
            console.log(`Review marked as helpful: ${reviewId} by user: ${userId}`);
            res.status(200).json({
                success: true,
                message: "Review marked as helpful",
                reviewId: updatedReviewId,
            });
        }
        catch (error) {
            logger.error(`Failed to mark review as helpful: ${error.message}`);
            console.error(`Failed to mark review as helpful: ${error.message}`);
            next(error);
        }
    }
    async decreaseHelpfulReview(req, res, next) {
        try {
            const userId = req.user?.id;
            const { reviewId } = req.params;
            if (!userId) {
                logger.error(`User ID not found in request`);
                console.error(`User ID not found in request`);
                throw new AppError("User ID not found in request", 400);
            }
            const updatedReviewId = await ReviewService.decreaseHelpfulReview(reviewId, userId);
            logger.info(`Review unmarked as helpful: ${reviewId} by user: ${userId}`);
            console.log(`Review unmarked as helpful: ${reviewId} by user: ${userId}`);
            res.status(200).json({
                success: true,
                message: "Review unmarked as helpful",
                reviewId: updatedReviewId,
            });
        }
        catch (error) {
            logger.error(`Failed to unmark review as helpful: ${error.message}`);
            console.error(`Failed to unmark review as helpful: ${error.message}`);
            next(error);
        }
    }
}
export const ReviewController = new ReviewControllerClass();
//# sourceMappingURL=review.controller.js.map