import { Router } from "express";
import { UserController } from "../controllers/user.controller.js";
import { createUserValidator, updateUserValidator, userIdValidator } from "../validators/user.validator.js";
import { validate } from "../middlewares/validation.middleware.js";
import { AuthMiddleware } from "../middlewares/auth.middleware.js";

export const userRouter = Router();

// Create a new user
userRouter.post(
    "/",
    createUserValidator,
    validate,
    UserController.createUser.bind(UserController)
);

// Get all users
userRouter.get("/", UserController.getAllUsers.bind(UserController));

userRouter.get("/by-name", UserController.getAllUsers.bind(UserController));

// Get user by ID
userRouter.get(
    "/:userId",
    userIdValidator,
    validate,
    UserController.getUserById.bind(UserController)
);

// Update user by ID
userRouter.patch(
    "/",
    AuthMiddleware,
    updateUserValidator,
    validate,
    UserController.updateUser.bind(UserController)
);

// Delete user by ID
userRouter.delete(
    "/",
    AuthMiddleware,
    UserController.deleteUser.bind(UserController)
);
