import type { CreateReviewDto } from "../types/review/review-create.dto.js";
import type { UpdateReviewDto } from "../types/review/review-update.dto.js";
declare class ReviewServiceClass {
    createReview(payload: CreateReviewDto, brandId: string, userId: string): Promise<import("mongoose").Document<unknown, {}, import("../interfaces/review.interface.js").IReview, {}, {}> & import("../interfaces/review.interface.js").IReview & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    getAllReview(brandId: string): Promise<(import("mongoose").FlattenMaps<import("../interfaces/review.interface.js").IReview> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    getReview(reviewId: string): Promise<(import("mongoose").Document<unknown, {}, import("../interfaces/review.interface.js").IReview, {}, {}> & import("../interfaces/review.interface.js").IReview & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
    getUserReview(userId: string): Promise<(import("mongoose").Document<unknown, {}, import("../interfaces/review.interface.js").IReview, {}, {}> & import("../interfaces/review.interface.js").IReview & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    updateReview(reviewId: string, userId: string, payload: UpdateReviewDto): Promise<import("mongoose").Types.ObjectId>;
    increaseHelpfulReview(reviewId: string, userId: string): Promise<import("mongoose").Types.ObjectId>;
    decreaseHelpfulReview(reviewId: string, userId: string): Promise<import("mongoose").Types.ObjectId>;
    deleteReview(reviewId: string, userId: string): Promise<string>;
}
export declare const ReviewService: ReviewServiceClass;
export {};
