import { Types } from "mongoose";
import { logger } from "../config/logger";
import { Brand } from "../models/brand.model";
import { CreateBrandDto } from "../types/brand/brand-create.dto";
import { AppError } from "../utils/AppError";

class BrandClassService {
    async createBrand(payload: CreateBrandDto, userId: string | Types.ObjectId) {
        try {
            const isBrandExists = await Brand.exists({
                $or: [
                    {
                        name: payload.name
                    },
                    {
                        slug: payload.slug
                    },
                ]
            })

            if (isBrandExists) {
                logger.error(`Brand with same name or slug already exists: `)
                console.error(`Brand with same name already exists`)
                throw new AppError(`Brand with same name already exists`, 409)
            }

            const newbrand = await Brand.create({
                ...payload,
                isIndianBrand: payload.country.toLowerCase().trim() === "india" ? true : false,
                founderId: userId,
                publishedAt: payload.status === "draft" ? null : new Date()
            })
            return newbrand
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            logger.error(`Failed to create new brand: ${errorMessage}`)
            console.error(`Failed to create new brand: ${errorMessage}`)
            throw new AppError(`Failed to create brand: ${errorMessage}`, 500)
        }
    }
}