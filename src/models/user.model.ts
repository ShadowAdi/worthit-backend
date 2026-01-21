import mongoose, { Schema } from "mongoose";
import { IUser } from "../interfaces/user.interface";

export const SocialLinkSchema = new Schema(
    {
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
    },
    { _id: false }
);

const schema = new Schema<IUser>({
    about: {
        type: String,
        trim: true
    },
    name: {
        type: String,
        trim: true
    },
    username: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
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
},{
    timestamps:true
})

export const UserModel= mongoose.model("User",schema)