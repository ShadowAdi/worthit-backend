import mongoose, { Model } from "mongoose";
import type { IUser } from "../interfaces/user.interface.js";
export declare const SocialLinkSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    _id: false;
}, {
    key: string;
    value: string;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    key: string;
    value: string;
}>, {}, mongoose.ResolveSchemaOptions<{
    _id: false;
}>> & mongoose.FlatRecord<{
    key: string;
    value: string;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
export declare const User: Model<IUser>;
