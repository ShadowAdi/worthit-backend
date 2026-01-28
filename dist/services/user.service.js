import { logger } from "../config/logger.js";
import { User } from "../models/user.model.js";
import { AppError } from "../utils/AppError.js";
import { hashPassword } from "../utils/password-utils.js";
class UserClassService {
    async createUser(payload) {
        try {
            const exists = await User.findOne({
                email: payload.email
            });
            if (exists) {
                logger.error(`User Already Exists`);
                throw new AppError(`User Already Exists`, 409);
            }
            const hashedPassword = await hashPassword(payload.password);
            const user = await User.create({
                ...payload,
                password: hashedPassword
            });
            return {
                username: user.username,
                email: user.email,
                _id: user._id,
                createdAt: user.createdAt
            };
        }
        catch (error) {
            logger.error(`Failed to create user: ${error}`);
            console.error(`Failed to create user: ${error}`);
            throw new AppError(`Failed to create user`, 500);
        }
    }
    async getAllUser(username) {
        try {
            let query = {};
            if (username) {
                // Case-insensitive partial match search
                query.username = { $regex: username, $options: 'i' };
            }
            const users = await User.find(query).select('-password');
            return {
                users,
                totalUsers: users.length,
            };
        }
        catch (error) {
            logger.error(`Failed to get all user service: ${error.message}`);
            console.error(`Failed to get all user service: ${error.message}`);
            throw error instanceof AppError
                ? error
                : new AppError("Internal Server Error", 500);
        }
    }
    async getUsersByUsername(username) {
        try {
            const users = await User.find({
                username: { $regex: username, $options: 'i' }
            });
            return {
                users,
                totalUsers: users.length,
            };
        }
        catch (error) {
            logger.error(`Failed to get user by username service: ${error.message}`);
            console.error(`Failed to get all user by usernames service: ${error.message}`);
            throw error instanceof AppError
                ? error
                : new AppError("Internal Server Error", 500);
        }
    }
    async getUser(userId) {
        try {
            const user = await User.findById(userId);
            return user;
        }
        catch (error) {
            logger.error(`Failed to get user service: ${error.message}`);
            console.error(`Failed to get user service: ${error.message}`);
            throw error instanceof AppError
                ? error
                : new AppError("Internal Server Error", 500);
        }
    }
    async getUserByEmail(email) {
        try {
            const user = await User.findOne({
                email: email
            }).select("+password");
            return user;
        }
        catch (error) {
            logger.error(`Failed to get user service by email:${email}: ${error.message}`);
            console.error(`Failed to get user service by email:${email}: ${error.message}`);
            throw error instanceof AppError
                ? error
                : new AppError("Internal Server Error", 500);
        }
    }
    async deleteUser(userId) {
        try {
            await User.findByIdAndDelete(userId);
            return "User deleted successfully";
        }
        catch (error) {
            logger.error(`Failed to delete user service: ${error.message}`);
            console.error(`Failed to delete user service: ${error.message}`);
            throw error instanceof AppError
                ? error
                : new AppError("Internal Server Error", 500);
        }
    }
    async updateUser(userId, updateUser) {
        try {
            // Get the current user
            const currentUser = await User.findById(userId);
            if (!currentUser) {
                throw new AppError("User not found", 404);
            }
            // Handle social_links merging if provided
            if (updateUser.social_links && Array.isArray(updateUser.social_links)) {
                const existingLinks = currentUser.social_links || [];
                const newLinks = updateUser.social_links;
                // Create a map of existing links
                const linksMap = new Map(existingLinks.map(link => [link.key, link.value]));
                // Update or add new links
                newLinks.forEach(link => {
                    linksMap.set(link.key, link.value);
                });
                // Convert map back to array
                updateUser.social_links = Array.from(linksMap.entries()).map(([key, value]) => ({
                    key,
                    value
                }));
            }
            const updatedUser = await User.findByIdAndUpdate(userId, updateUser, { new: true });
            if (!updatedUser) {
                throw new AppError("User not found", 404);
            }
            return updatedUser._id;
        }
        catch (error) {
            logger.error(`Failed to update user service: ${error.message}`);
            throw error instanceof AppError
                ? error
                : new AppError("Internal Server Error", 500);
        }
    }
}
export const UserService = new UserClassService();
//# sourceMappingURL=user.service.js.map