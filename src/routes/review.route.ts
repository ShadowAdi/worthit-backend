import { Router } from "express";
import { ReviewController } from "../controllers/review.controller";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validation.middleware";
import {
    createReviewValidator,
    updateReviewValidator,
    reviewIdValidator,
    brandIdValidator,
    userIdValidator
} from "../validators/review.validator";

export const reviewRouter = Router();

// Create a new review for a brand (requires authentication)
reviewRouter.post(
    "/brand/:brandId",
    AuthMiddleware,
    brandIdValidator,
    createReviewValidator,
    validate,
    ReviewController.createReview.bind(ReviewController)
);

// Get all reviews for a specific brand
reviewRouter.get(
    "/brand/:brandId",
    brandIdValidator,
    validate,
    ReviewController.getAllReviews.bind(ReviewController)
);

// Get all reviews by a specific user
reviewRouter.get(
    "/user/:userId",
    userIdValidator,
    validate,
    ReviewController.getUserReview.bind(ReviewController)
);

// Get a single review by ID
reviewRouter.get(
    "/:reviewId",
    reviewIdValidator,
    validate,
    ReviewController.getReview.bind(ReviewController)
);

// Update a review by ID (requires authentication)
reviewRouter.patch(
    "/:reviewId",
    AuthMiddleware,
    reviewIdValidator,
    updateReviewValidator,
    validate,
    ReviewController.updateReview.bind(ReviewController)
);

// Delete a review by ID (requires authentication)
reviewRouter.delete(
    "/:reviewId",
    AuthMiddleware,
    reviewIdValidator,
    validate,
    ReviewController.deleteReview.bind(ReviewController)
);
