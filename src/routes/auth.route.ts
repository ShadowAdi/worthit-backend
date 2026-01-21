import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { loginUserValidator } from "../validators/auth.validator";
import { validate } from "../middlewares/validation.middleware";
import { AuthMiddleware } from "../middlewares/auth.middleware";

export const authRouter = Router();

// Login user
authRouter.post(
    "/login", 
    loginUserValidator, 
    validate, 
    AuthController.loginUser.bind(AuthController)
);

// Get authenticated user
authRouter.get(
    "/me", 
    AuthMiddleware, 
    AuthController.getAuthenticatedUser.bind(AuthController)
);
