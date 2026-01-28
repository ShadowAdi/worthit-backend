import type { LoginUserDto } from "../types/auth/login-user.dto.js";
declare class AuthServiceClass {
    LoginUser({ email, password, }: LoginUserDto): Promise<{
        user: {
            email: string;
            id: import("mongoose").Types.ObjectId;
        };
        token: string;
    }>;
    getAuthenticatedUser(email: string): Promise<{
        _id: import("mongoose").Types.ObjectId;
        email: string;
        username: string;
        name: string | undefined;
        about: string | undefined;
        profile_url: string | undefined;
        social_links: {
            key: string;
            value: string;
        }[] | undefined;
        authProvider: "email" | "google";
        createdAt: string | Date;
    }>;
}
export declare const AuthService: AuthServiceClass;
export {};
