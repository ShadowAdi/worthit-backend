import { Request, Response, NextFunction } from "express";
declare class AuthControllerClass {
    loginUser(req: Request, res: Response, next: NextFunction): Promise<void>;
    getAuthenticatedUser(req: Request, res: Response, next: NextFunction): Promise<void>;
}
export declare const AuthController: AuthControllerClass;
export {};
