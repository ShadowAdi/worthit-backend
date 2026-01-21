import { Request, Response, NextFunction } from "express";
import { AuthService } from "../services/auth.service";
import { LoginUserDto } from "../types/auth/login-user.dto";
import { logger } from "../config/logger";
import { AppError } from "../utils/AppError";

class AuthControllerClass {
    async loginUser(req: Request, res: Response, next: NextFunction) {
        try {
            logger.info(`Login attempt for email: ${req.body.email}`);
            console.log(`Login attempt for email: ${req.body.email}`);
            
            const payload: LoginUserDto = req.body;
            const result = await AuthService.LoginUser(payload);
            
            logger.info(`User logged in successfully: ${result.user.id}`);
            console.log(`User logged in successfully: ${result.user.id}`);
            
            res.status(200).json({
                success: true,
                message: "User logged in successfully",
                data: result
            });
        } catch (error: any) {
            logger.error(`Failed to login user controller: ${error.message}`);
            console.error(`Failed to login user controller: ${error.message}`);
            next(error);
        }
    }
}

export const AuthController = new AuthControllerClass();
