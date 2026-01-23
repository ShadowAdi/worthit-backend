import { Document, Types } from 'mongoose';

export interface IReview extends Document {
    userId: Types.ObjectId | string;
    brandId: Types.ObjectId | string;
    usageStatus: "used" | "gifted" | "not_used";
    worthTheMoney: boolean;
    biggestDisappointment: string;
    whoShouldNotBuy: string;
    recommendation: "recommend" | "not_recommend";
    additionalNotes?: string;
    isEdited: boolean;
    createdAt: Date;
    updatedAt: Date;
}