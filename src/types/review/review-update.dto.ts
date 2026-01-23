
export interface UpdateReviewDto {
    usageStatus?: "used" | "gifted" | "not_used";
    worthTheMoney?: boolean;
    biggestDisappointment?: string;
    whoShouldNotBuy?: string;
    additionalNotes?: string;
}