import { Router } from "express";
import { AuthController } from "../controllers/auth.controller.js";
import { loginUserValidator } from "../validators/auth.validator.js";
import { validate } from "../middlewares/validation.middleware.js";
import { AuthMiddleware } from "../middlewares/auth.middleware.js";

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
