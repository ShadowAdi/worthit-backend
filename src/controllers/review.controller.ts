import { NextFunction, Request, Response } from "express";
import { logger } from "../config/logger";
import { AppError } from "../utils/AppError";
import { CreateReviewDto } from "../types/review/review-create.dto";
import { ReviewService } from "../services/review.service";

class BrandControllerClass {
    async createReview(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.user?.id;
            const { brandId } = req.params

            if (!userId) {
                logger.error(`User ID not found in request`);
                console.error(`User ID not found in request`);
                throw new AppError("User ID not found in request", 400);
            }


            const payload: CreateReviewDto = req.body;
            const newReview = await ReviewService.createReview(payload, brandId as string, userId);

            logger.info(`Review created successfully: ${newReview._id}`);
            console.log(`Review created successfully: ${newReview._id}`);

            res.status(201).json({
                success: true,
                message: "Review created successfully",
                data: newReview
            });
        } catch (error: any) {
            logger.error(`Failed to create Review controller: ${error.message}`);
            console.error(`Failed to create Review controller: ${error.message}`);
            next(error);
        }
    }
}