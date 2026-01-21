import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { loginUserValidator } from "../validators/auth.validator";
import { validate } from "../middlewares/validation.middleware";

export const authRouter = Router();

// Login user
authRouter.post(
    "/login", 
    loginUserValidator, 
    validate, 
    AuthController.loginUser.bind(AuthController)
);
