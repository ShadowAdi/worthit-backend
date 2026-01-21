import { Router } from "express";
import { UserController } from "../controllers/user.controller";

export const userRouter = Router();

// Create a new user
userRouter.post("/", UserController.createUser.bind(UserController));

// Get all users
userRouter.get("/", UserController.getAllUsers.bind(UserController));

// Get user by ID
userRouter.get("/:userId", UserController.getUserById.bind(UserController));

// Update user by ID
userRouter.patch("/:userId", UserController.updateUser.bind(UserController));

// Delete user by ID
userRouter.delete("/:userId", UserController.deleteUser.bind(UserController));
