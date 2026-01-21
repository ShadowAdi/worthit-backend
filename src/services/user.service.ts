import { logger } from "../config/logger";
import { User } from "../models/user.model";
import { CreateUserDto } from "../types/user/create-user.dto";
import { AppError } from "../utils/AppError";
import { hashPassword } from "../utils/password-utils";

class UserClassService {
    async createUser(payload: CreateUserDto) {
        try {
            const exists = await User.findOne({
                email: payload.email
            })
            if (exists) {
                logger.error(`User Already Exists`)
                throw new AppError(`User Already Exists`, 409)
            }
            const hashedPassword = await hashPassword(payload.password)

            const user = await User.create({
                ...payload,
                password: hashedPassword
            })
            return {
                username: user.username,
                email: user.email,
                _id: user._id,
                createdAt: user.createdAt
            }
        } catch (error) {
            logger.error(`Failed to create user: ${error}`)
            console.error(`Failed to create user: ${error}`)
            throw new AppError(`Failed to create user`, 500)
        }
    }
}

export const UserService = new UserClassService()