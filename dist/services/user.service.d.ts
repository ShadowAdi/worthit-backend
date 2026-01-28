import type { CreateUserDto } from "../types/user/create-user.dto.js";
import type { UpdateUserDto } from "../types/user/update-user.dto.js";
declare class UserClassService {
    createUser(payload: CreateUserDto): Promise<{
        username: string;
        email: string;
        _id: import("mongoose").Types.ObjectId;
        createdAt: string | Date;
    }>;
    getAllUser(username?: string): Promise<{
        users: (import("mongoose").Document<unknown, {}, import("../interfaces/user.interface.js").IUser, {}, {}> & import("../interfaces/user.interface.js").IUser & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        })[];
        totalUsers: number;
    }>;
    getUsersByUsername(username: string): Promise<{
        users: (import("mongoose").Document<unknown, {}, import("../interfaces/user.interface.js").IUser, {}, {}> & import("../interfaces/user.interface.js").IUser & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        })[];
        totalUsers: number;
    }>;
    getUser(userId: string): Promise<(import("mongoose").Document<unknown, {}, import("../interfaces/user.interface.js").IUser, {}, {}> & import("../interfaces/user.interface.js").IUser & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
    getUserByEmail(email: string): Promise<(import("mongoose").Document<unknown, {}, import("../interfaces/user.interface.js").IUser, {}, {}> & import("../interfaces/user.interface.js").IUser & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
    deleteUser(userId: string): Promise<string>;
    updateUser(userId: string, updateUser: UpdateUserDto): Promise<import("mongoose").Types.ObjectId>;
}
export declare const UserService: UserClassService;
export {};
