import { logger } from "../config/logger";
import { User } from "../models/user.model";
import { CreateUserDto } from "../types/user/create-user.dto";
import { UpdateUserDto } from "../types/user/update-user.dto";
import { AppError } from "../utils/AppError";
import { hashPassword } from "../utils/password-utils";

class UserClassService {
    async createUser(payload: CreateUserDto) {
        try {
            const exists = await User.findOne({
                email: payload.email
            })
            if (exists) {
                logger.error(`User Already Exists`)
                throw new AppError(`User Already Exists`, 409)
            }
            const hashedPassword = await hashPassword(payload.password)

            const user = await User.create({
                ...payload,
                password: hashedPassword
            })
            return {
                username: user.username,
                email: user.email,
                _id: user._id,
                createdAt: user.createdAt
            }
        } catch (error) {
            logger.error(`Failed to create user: ${error}`)
            console.error(`Failed to create user: ${error}`)
            throw new AppError(`Failed to create user`, 500)
        }
    }

    async getAllUser() {
        try {
            const users = await User.find();

            return {
                users,
                totalUsers: users.length,
            };
        } catch (error: any) {
            logger.error(`Failed to get all user service: ${error.message}`);
            console.error(`Failed to get all user service: ${error.message}`);
            throw error instanceof AppError
                ? error
                : new AppError("Internal Server Error", 500);
        }
    }

    async getUser(userId: string) {
        try {
            const user = await User.findById(userId);
            return user
        } catch (error: any) {
            logger.error(`Failed to get user service: ${error.message}`);
            console.error(`Failed to get user service: ${error.message}`);
            throw error instanceof AppError
                ? error
                : new AppError("Internal Server Error", 500);
        }
    }

    async deleteUser(userId: string) {
        try {
            await User.findByIdAndDelete(userId);
            return "User deleted successfully"
        } catch (error: any) {
            logger.error(`Failed to delete user service: ${error.message}`);
            console.error(`Failed to delete user service: ${error.message}`);
            throw error instanceof AppError
                ? error
                : new AppError("Internal Server Error", 500);
        }
    }

    async updateUser(userId: string, updateUser: UpdateUserDto) {
        try {
            const updatedUser = await User.findByIdAndUpdate(
                userId,
                updateUser,
                { new: true }
            );

            if (!updatedUser) {
                throw new AppError("User not found", 404);
            }

            return updatedUser._id;
        } catch (error: any) {
            logger.error(`Failed to update user service: ${error.message}`);
            throw error instanceof AppError
                ? error
                : new AppError("Internal Server Error", 500);
        }
    }
}

export const UserService = new UserClassService()