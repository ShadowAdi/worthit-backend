import { Router } from "express";
import { ReviewController } from "../controllers/review.controller";
import { AuthMiddleware } from "../middlewares/auth.middleware";

export const reviewRouter = Router();

// Create a new review for a brand (requires authentication)
reviewRouter.post(
    "/brand/:brandId",
    AuthMiddleware,
    ReviewController.createReview.bind(ReviewController)
);

// Get all reviews for a specific brand
reviewRouter.get(
    "/brand/:brandId",
    ReviewController.getAllReviews.bind(ReviewController)
);

// Get all reviews by a specific user
reviewRouter.get(
    "/user/:userId",
    ReviewController.getUserReview.bind(ReviewController)
);

// Get a single review by ID
reviewRouter.get(
    "/:reviewId",
    ReviewController.getReview.bind(ReviewController)
);

// Update a review by ID (requires authentication)
reviewRouter.patch(
    "/:reviewId",
    AuthMiddleware,
    ReviewController.updateReview.bind(ReviewController)
);

// Delete a review by ID (requires authentication)
reviewRouter.delete(
    "/:reviewId",
    AuthMiddleware,
    ReviewController.deleteReview.bind(ReviewController)
);
