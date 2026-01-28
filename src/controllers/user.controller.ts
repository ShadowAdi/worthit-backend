import { Request, Response, NextFunction } from "express";
import { UserService } from "../services/user.service.js";
import type { CreateUserDto } from "../types/user/create-user.dto.js";
import type { UpdateUserDto } from "../types/user/update-user.dto.js";
import { logger } from "../config/logger.js";
import { AppError } from "../utils/AppError.js";

class UserControllerClass {
    async createUser(req: Request, res: Response, next: NextFunction) {
        try {
            logger.info(`Creating new user with username: ${req.body.username}`);
            console.log(`Creating new user with username: ${req.body.username}`);

            const payload: CreateUserDto = req.body;
            const {token,user} = await UserService.createUser(payload);

            logger.info(`User created successfully: ${user._id}`);
            console.log(`User created successfully: ${user._id}`);

            res.status(201).json({
                success: true,
                message: "User created successfully",
                user,
                token
            });
        } catch (error: any) {
            logger.error(`Failed to create user controller: ${error.message}`);
            console.error(`Failed to create user controller: ${error.message}`);
            next(error);
        }
    }

    async getAllUsers(req: Request, res: Response, next: NextFunction) {
        try {
            const { username } = req.query;
            logger.info(`Fetching all users${username ? ` with username filter: ${username}` : ''}`);
            console.log(`Fetching all users${username ? ` with username filter: ${username}` : ''}`);

            const result = await UserService.getAllUser(username as string | undefined);

            logger.info(`Retrieved ${result.totalUsers} users successfully`);
            console.log(`Retrieved ${result.totalUsers} users successfully`);

            res.status(200).json({
                success: true,
                message: "Users retrieved successfully",
                data: result
            });
        } catch (error: any) {
            logger.error(`Failed to get all users controller: ${error.message}`);
            console.error(`Failed to get all users controller: ${error.message}`);
            next(error);
        }
    }

    async getUsersByUsername(req: Request, res: Response, next: NextFunction) {
        try {
            const { username } = req.query
            const result = await UserService.getUsersByUsername(String(username));

            res.status(200).json({
                success: true,
                data: result
            });
        } catch (error: any) {
            logger.error(`Failed to get all users by name controller: ${error.message}`);
            console.error(`Failed to get all users by name controller: ${error.message}`);
            next(error);
        }
    }

    async getUserById(req: Request, res: Response, next: NextFunction) {
        try {
            const { userId } = req.params;

            logger.info(`Fetching user with ID: ${userId}`);
            console.log(`Fetching user with ID: ${userId}`);

            const user = await UserService.getUser(userId as string);

            if (!user) {
                logger.error(`User not found with ID: ${userId}`);
                console.error(`User not found with ID: ${userId}`);
                throw new AppError("User not found", 404);
            }

            logger.info(`User retrieved successfully: ${userId}`);
            console.log(`User retrieved successfully: ${userId}`);

            res.status(200).json({
                success: true,
                message: "User retrieved successfully",
                data: user
            });
        } catch (error: any) {
            logger.error(`Failed to get user controller: ${error.message}`);
            console.error(`Failed to get user controller: ${error.message}`);
            next(error);
        }
    }

    async updateUser(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.user?.id;

            if (!userId) {
                logger.error(`User Id not found in request`);
                console.error(`User Id not found in request`);
                throw new Error("User Id not found in request");
            }

            logger.info(`Updating user with ID: ${userId}`);
            console.log(`Updating user with ID: ${userId}`);

            const updateData: UpdateUserDto = req.body;


            const updatedUserId = await UserService.updateUser(userId as string, updateData);

            logger.info(`User updated successfully: ${updatedUserId}`);
            console.log(`User updated successfully: ${updatedUserId}`);

            res.status(200).json({
                success: true,
                message: "User updated successfully",
                userId: updatedUserId
            });
        } catch (error: any) {
            logger.error(`Failed to update user controller: ${error.message}`);
            console.error(`Failed to update user controller: ${error.message}`);
            next(error);
        }
    }

    async deleteUser(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.user?.id;

            if (!userId) {
                logger.error(`User Id not found in request`);
                console.error(`User Id not found in request`);
                throw new Error("User Id not found in request");
            }

            logger.info(`Deleting user with ID: ${userId}`);
            console.log(`Deleting user with ID: ${userId}`);

            const message = await UserService.deleteUser(userId as string);

            logger.info(`User deleted successfully: ${userId}`);
            console.log(`User deleted successfully: ${userId}`);

            res.status(200).json({
                success: true,
                message: message
            });
        } catch (error: any) {
            logger.error(`Failed to delete user controller: ${error.message}`);
            console.error(`Failed to delete user controller: ${error.message}`);
            next(error);
        }
    }
}

export const UserController = new UserControllerClass();
