import { NextFunction, Request, Response } from "express";
import { JwtUserPayload } from "../types/auth/jwt-extended.payload.js";
declare global {
    namespace Express {
        interface Request {
            user?: JwtUserPayload;
        }
    }
}
export declare const AuthMiddleware: (request: Request, response: Response, next: NextFunction) => Promise<void>;
export declare const OptionalAuthMiddleware: (request: Request, response: Response, next: NextFunction) => Promise<void>;
