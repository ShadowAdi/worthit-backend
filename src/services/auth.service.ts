import { JWT_SECRET_KEY } from "../config/dotenv.js";
import { logger } from "../config/logger.js";
import type { LoginUserDto } from "../types/auth/login-user.dto.js";
import { AppError } from "../utils/AppError.js";
import { comparePassword } from "../utils/password-utils.js";
import { UserService } from "./user.service.js";
import jwt from "jsonwebtoken";


class AuthServiceClass {
    async LoginUser({
        email,
        password,
    }: LoginUserDto) {
        try {
            if (!JWT_SECRET_KEY) {
                logger.error(`Failed to get The JWT Key. Please Provide it First`);
                throw new AppError(`INTERNAL SERVER ERROR`, 500);
            }

            const isUserExists = await UserService.getUserByEmail(email);
            if (!isUserExists) {
                logger.error(`User with mail: ${email} not found`);
                throw new AppError(`User with mail: ${email} not found`, 404);
            }

            const hashedPassword = comparePassword(password, isUserExists.password);
            if (!hashedPassword) {
                logger.error(`Invalid Credentials`);
                throw new AppError(`Invalid Credentials`, 404);
            }

            const payload = {
                email: isUserExists.email,
                id: isUserExists._id,
            };


            const token = jwt.sign(payload, JWT_SECRET_KEY, {
                expiresIn: "7d",
            });

            return {
                user: {
                    email: isUserExists.email,
                    id: isUserExists._id,
                },
                token
            };
        } catch (error) {
            logger.error(`Failed to signin User: ${error}`);
            console.error(`Failed to signin User: ${error}`)
            throw new AppError(
                error instanceof AppError ? error.message : "Failed to signin user",
                error instanceof AppError ? error.statusCode : 500
            );
        }
    };

    async getAuthenticatedUser(email: string) {
        try {
            logger.info(`Fetching authenticated user with email: ${email}`);
            console.log(`Fetching authenticated user with email: ${email}`);

            const user = await UserService.getUserByEmail(email);
            
            if (!user) {
                logger.error(`Authenticated user not found with email: ${email}`);
                throw new AppError(`User not found`, 404);
            }

            logger.info(`Authenticated user retrieved successfully: ${user._id}`);
            console.log(`Authenticated user retrieved successfully: ${user._id}`);

            return {
                _id: user._id,
                email: user.email,
                username: user.username,
                name: user.name,
                about: user.about,
                profile_url: user.profile_url,
                social_links: user.social_links,
                authProvider: user.authProvider,
                createdAt: user.createdAt
            };
        } catch (error) {
            logger.error(`Failed to get authenticated user: ${error}`);
            console.error(`Failed to get authenticated user: ${error}`);
            throw new AppError(
                error instanceof AppError ? error.message : "Failed to get authenticated user",
                error instanceof AppError ? error.statusCode : 500
            );
        }
    }
}

export const AuthService = new AuthServiceClass()