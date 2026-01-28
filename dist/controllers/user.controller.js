import { UserService } from "../services/user.service.js";
import { logger } from "../config/logger.js";
import { AppError } from "../utils/AppError.js";
class UserControllerClass {
    async createUser(req, res, next) {
        try {
            logger.info(`Creating new user with username: ${req.body.username}`);
            console.log(`Creating new user with username: ${req.body.username}`);
            const payload = req.body;
            const user = await UserService.createUser(payload);
            logger.info(`User created successfully: ${user._id}`);
            console.log(`User created successfully: ${user._id}`);
            res.status(201).json({
                success: true,
                message: "User created successfully",
                user: user
            });
        }
        catch (error) {
            logger.error(`Failed to create user controller: ${error.message}`);
            console.error(`Failed to create user controller: ${error.message}`);
            next(error);
        }
    }
    async getAllUsers(req, res, next) {
        try {
            const { username } = req.query;
            logger.info(`Fetching all users${username ? ` with username filter: ${username}` : ''}`);
            console.log(`Fetching all users${username ? ` with username filter: ${username}` : ''}`);
            const result = await UserService.getAllUser(username);
            logger.info(`Retrieved ${result.totalUsers} users successfully`);
            console.log(`Retrieved ${result.totalUsers} users successfully`);
            res.status(200).json({
                success: true,
                message: "Users retrieved successfully",
                data: result
            });
        }
        catch (error) {
            logger.error(`Failed to get all users controller: ${error.message}`);
            console.error(`Failed to get all users controller: ${error.message}`);
            next(error);
        }
    }
    async getUsersByUsername(req, res, next) {
        try {
            const { username } = req.query;
            const result = await UserService.getUsersByUsername(String(username));
            res.status(200).json({
                success: true,
                data: result
            });
        }
        catch (error) {
            logger.error(`Failed to get all users by name controller: ${error.message}`);
            console.error(`Failed to get all users by name controller: ${error.message}`);
            next(error);
        }
    }
    async getUserById(req, res, next) {
        try {
            const { userId } = req.params;
            logger.info(`Fetching user with ID: ${userId}`);
            console.log(`Fetching user with ID: ${userId}`);
            const user = await UserService.getUser(userId);
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
        }
        catch (error) {
            logger.error(`Failed to get user controller: ${error.message}`);
            console.error(`Failed to get user controller: ${error.message}`);
            next(error);
        }
    }
    async updateUser(req, res, next) {
        try {
            const userId = req.user?.id;
            if (!userId) {
                logger.error(`User Id not found in request`);
                console.error(`User Id not found in request`);
                throw new Error("User Id not found in request");
            }
            logger.info(`Updating user with ID: ${userId}`);
            console.log(`Updating user with ID: ${userId}`);
            const updateData = req.body;
            const updatedUserId = await UserService.updateUser(userId, updateData);
            logger.info(`User updated successfully: ${updatedUserId}`);
            console.log(`User updated successfully: ${updatedUserId}`);
            res.status(200).json({
                success: true,
                message: "User updated successfully",
                userId: updatedUserId
            });
        }
        catch (error) {
            logger.error(`Failed to update user controller: ${error.message}`);
            console.error(`Failed to update user controller: ${error.message}`);
            next(error);
        }
    }
    async deleteUser(req, res, next) {
        try {
            const userId = req.user?.id;
            if (!userId) {
                logger.error(`User Id not found in request`);
                console.error(`User Id not found in request`);
                throw new Error("User Id not found in request");
            }
            logger.info(`Deleting user with ID: ${userId}`);
            console.log(`Deleting user with ID: ${userId}`);
            const message = await UserService.deleteUser(userId);
            logger.info(`User deleted successfully: ${userId}`);
            console.log(`User deleted successfully: ${userId}`);
            res.status(200).json({
                success: true,
                message: message
            });
        }
        catch (error) {
            logger.error(`Failed to delete user controller: ${error.message}`);
            console.error(`Failed to delete user controller: ${error.message}`);
            next(error);
        }
    }
}
export const UserController = new UserControllerClass();
//# sourceMappingURL=user.controller.js.map