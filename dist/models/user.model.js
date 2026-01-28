import mongoose, { Schema } from "mongoose";
export const SocialLinkSchema = new Schema({
    key: {
        type: String,
        required: true,
        trim: true,
    },
    value: {
        type: String,
        required: true,
        trim: true,
    },
}, { _id: false });
const schema = new Schema({
    about: {
        type: String,
        trim: true
    },
    name: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    username: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    profile_url: {
        type: String
    },
    authProvider: {
        type: String,
        enum: ["email", "google"],
        default: "email"
    },
    social_links: {
        type: [SocialLinkSchema],
        default: []
    }
}, {
    timestamps: true
});
export const User = mongoose.models.User || mongoose.model("User", schema);
//# sourceMappingURL=user.model.js.map