import { Request, Response, NextFunction } from "express";
declare class UserControllerClass {
    createUser(req: Request, res: Response, next: NextFunction): Promise<void>;
    getAllUsers(req: Request, res: Response, next: NextFunction): Promise<void>;
    getUsersByUsername(req: Request, res: Response, next: NextFunction): Promise<void>;
    getUserById(req: Request, res: Response, next: NextFunction): Promise<void>;
    updateUser(req: Request, res: Response, next: NextFunction): Promise<void>;
    deleteUser(req: Request, res: Response, next: NextFunction): Promise<void>;
}
export declare const UserController: UserControllerClass;
export {};
