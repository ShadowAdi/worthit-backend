import { AuthService } from "../services/auth.service.js";
import { logger } from "../config/logger.js";
class AuthControllerClass {
    async loginUser(req, res, next) {
        try {
            logger.info(`Login attempt for email: ${req.body.email}`);
            console.log(`Login attempt for email: ${req.body.email}`);
            const payload = req.body;
            const result = await AuthService.LoginUser(payload);
            logger.info(`User logged in successfully: ${result.user.id}`);
            console.log(`User logged in successfully: ${result.user.id}`);
            res.status(200).json({
                success: true,
                message: "User logged in successfully",
                data: result
            });
        }
        catch (error) {
            logger.error(`Failed to login user controller: ${error.message}`);
            console.error(`Failed to login user controller: ${error.message}`);
            next(error);
        }
    }
    async getAuthenticatedUser(req, res, next) {
        try {
            const userEmail = req.user?.email;
            if (!userEmail) {
                logger.error(`User email not found in request`);
                console.error(`User email not found in request`);
                throw new Error("User email not found in request");
            }
            logger.info(`Fetching authenticated user data for: ${userEmail}`);
            console.log(`Fetching authenticated user data for: ${userEmail}`);
            const user = await AuthService.getAuthenticatedUser(userEmail);
            logger.info(`Authenticated user data retrieved successfully: ${user._id}`);
            console.log(`Authenticated user data retrieved successfully: ${user._id}`);
            res.status(200).json({
                success: true,
                message: "User data retrieved successfully",
                data: user
            });
        }
        catch (error) {
            logger.error(`Failed to get authenticated user controller: ${error.message}`);
            console.error(`Failed to get authenticated user controller: ${error.message}`);
            next(error);
        }
    }
}
export const AuthController = new AuthControllerClass();
//# sourceMappingURL=auth.controller.js.map