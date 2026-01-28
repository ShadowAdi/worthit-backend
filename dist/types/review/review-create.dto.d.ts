export interface CreateReviewDto {
    usageStatus: "used" | "gifted" | "not_used";
    worthTheMoney: boolean;
    biggestDisappointment: string;
    whoShouldNotBuy: string;
    recommendation: "recommend" | "not_recommend";
    additionalNotes?: string;
}
