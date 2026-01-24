import mongoose, { Model, Schema } from "mongoose";
import { IBrand } from "../interfaces/brand.interface";

const ImageSchema = new Schema(
    {
        url: {
            type: String,
            required: true,
            trim: true,
        },
        alt: {
            type: String,
            required: true,
            trim: true,
        },
        order: {
            type: Number,
            required: true,
            default: 0,
        },
    },
    { _id: false }
);

const SocialLinkSchema = new Schema(
    {
        platform: {
            type: String,
            required: true,
            trim: true,
        },
        url: {
            type: String,
            required: true,
            trim: true,
        },
    },
    { _id: false }
);

const TeamMemberSchema = new Schema(
    {
        role: {
            type: String,
            required: true,
            trim: true,
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        isVerified: {
            type: Boolean,
            default: false,
        },
    },
    { _id: false }
);

const schema = new Schema<IBrand>(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
            trim: true,
        },
        slug: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
        },
        whyItExists: {
            type: String,
            required: true,
            trim: true,
        },
        images: {
            type: [ImageSchema],
            default: [],
        },
        demoVideo: {
            type: String,
            trim: true,
        },
        category: {
            type: [String],
            required: true,
            trim: true,
        },
        howToUse: {
            type: String,
            required: true,
            trim: true,
        },
        websiteUrl: {
            type: String,
            trim: true,
        },
        socialLinks: {
            type: [SocialLinkSchema],
            default: [],
        },
        country: {
            type: String,
            required: true,
            trim: true,
            default: "India",
        },
        isIndianBrand: {
            type: Boolean,
            default: true,
        },
        status: {
            type: String,
            enum: ["draft", "published"],
            default: "draft",
        },
        publishedAt: {
            type: Date,
        },
        launchAt: {
            type: Date,
        },
        recommendCount: {
            type: Number,
            default: 0,
            min: 0,
        },
        notRecommendCount: {
            type: Number,
            default: 0,
            min: 0,
        },
        reviewCount: {
            type: Number,
            default: 0,
            min: 0,
        },
        founderId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        team: {
            type: [TeamMemberSchema],
            default: [],
        },
        viewCount: {
            type: Number,
            default: 0,
            min: 0,
        },
        isVerified: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

schema.index({ name: 1 });
schema.index({ slug: 1 });
schema.index({ founderId: 1 });
schema.index({ status: 1 });
schema.index({ category: 1 });
schema.index({ publishedAt: -1 });
schema.index({ launchAt: -1 });

export const Brand: Model<IBrand> =
    mongoose.models.Brand || mongoose.model<IBrand>("Brand", schema);
