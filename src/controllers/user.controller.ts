import { Request, Response, NextFunction } from "express";
import { UserService } from "../services/user.service";
import { CreateUserDto } from "../types/user/create-user.dto";
import { UpdateUserDto } from "../types/user/update-user.dto";
import { logger } from "../config/logger";

class UserControllerClass {
    async createUser(req: Request, res: Response, next: NextFunction) {
        try {
            const payload: CreateUserDto = req.body;
            const user = await UserService.createUser(payload);
            
            res.status(201).json({
                success: true,
                message: "User created successfully",
                data: user
            });
        } catch (error) {
            next(error);
        }
    }

    async getAllUsers(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await UserService.getAllUser();
            
            res.status(200).json({
                success: true,
                message: "Users retrieved successfully",
                data: result
            });
        } catch (error) {
            next(error);
        }
    }

    async getUserById(req: Request, res: Response, next: NextFunction) {
        try {
            const { userId } = req.params;
            const user = await UserService.getUser(userId as string);
            
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "User not found"
                });
            }
            
            res.status(200).json({
                success: true,
                message: "User retrieved successfully",
                data: user
            });
        } catch (error) {
            next(error);
        }
    }

    async updateUser(req: Request, res: Response, next: NextFunction) {
        try {
            const { userId } = req.params;
            const updateData: UpdateUserDto = req.body;
            
            const updatedUserId = await UserService.updateUser(userId  as string, updateData);
            
            res.status(200).json({
                success: true,
                message: "User updated successfully",
                data: { userId: updatedUserId }
            });
        } catch (error) {
            next(error);
        }
    }

    async deleteUser(req: Request, res: Response, next: NextFunction) {
        try {
            const { userId } = req.params;
            const message = await UserService.deleteUser(userId as string);
            
            res.status(200).json({
                success: true,
                message: message
            });
        } catch (error) {
            next(error);
        }
    }
}

export const UserController = new UserControllerClass();
