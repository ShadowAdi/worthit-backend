import { NextFunction, Request, Response } from "express";
declare class ReviewControllerClass {
    createReview(req: Request, res: Response, next: NextFunction): Promise<void>;
    getAllReviews(req: Request, res: Response, next: NextFunction): Promise<void>;
    getReview(req: Request, res: Response, next: NextFunction): Promise<void>;
    updateReview(req: Request, res: Response, next: NextFunction): Promise<void>;
    deleteReview(req: Request, res: Response, next: NextFunction): Promise<void>;
    getUserReview(req: Request, res: Response, next: NextFunction): Promise<void>;
    increaseHelpfulReview(req: Request, res: Response, next: NextFunction): Promise<void>;
    decreaseHelpfulReview(req: Request, res: Response, next: NextFunction): Promise<void>;
}
export declare const ReviewController: ReviewControllerClass;
export {};
