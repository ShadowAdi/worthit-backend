import { JWT_SECRET_KEY } from "../config/dotenv";
import { logger } from "../config/logger";
import { LoginUserDto } from "../types/auth/login-user.dto";
import { AppError } from "../utils/AppError";
import { comparePassword } from "../utils/password-utils";
import { UserService } from "./user.service";
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
}

export const AuthService = new AuthServiceClass()