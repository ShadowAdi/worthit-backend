import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { createUserValidator, updateUserValidator, userIdValidator } from "../validators/user.validator";
import { validate } from "../middlewares/validation.middleware";

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

// Get user by ID
userRouter.get(
    "/:userId", 
    userIdValidator, 
    validate, 
    UserController.getUserById.bind(UserController)
);

// Update user by ID
userRouter.patch(
    "/:userId", 
    userIdValidator, 
    updateUserValidator, 
    validate, 
    UserController.updateUser.bind(UserController)
);

// Delete user by ID
userRouter.delete(
    "/:userId", 
    userIdValidator, 
    validate, 
    UserController.deleteUser.bind(UserController)
);
