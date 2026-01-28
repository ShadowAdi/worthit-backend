import mongoose, { Schema } from "mongoose";
const schema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true
    },
    brandId: {
        type: Schema.Types.ObjectId,
        ref: "Brand",
        required: true,
        index: true
    },
    usageStatus: {
        type: String,
        enum: ["used", "gifted", "not_used"],
        required: true,
        index: true
    },
    worthTheMoney: {
        type: Boolean,
        required: true,
    },
    biggestDisappointment: {
        type: String,
        required: true
    },
    whoShouldNotBuy: {
        type: String,
        required: true
    },
    recommendation: {
        type: String,
        enum: ["recommend", "not_recommend"],
        default: "recommend",
        index: true
    },
    additionalNotes: {
        type: String
    },
    isEdited: {
        type: Boolean,
        default: false
    },
    helpful: [{
            type: Schema.Types.ObjectId,
            ref: "User"
        }],
    helpfulCount: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});
export const Review = mongoose.models.Review || mongoose.model("Review", schema);
//# sourceMappingURL=review.model.js.map