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

    async getAllBrands() {
        try {
            const brands = await Brand.find()
                .populate("founderId", "username email profile_url")
                .lean();

            return {
                totalBrands: brands.length,
                brands
            };
        } catch (error) {
            const errorMessage =
                error instanceof Error ? error.message : 'Unknown error';

            logger.error(`Failed to get all brands: ${errorMessage}`);
            throw new AppError(`Failed to get all brands: ${errorMessage}`, 500);
        }
    }

    async getBrand(brandId: string) {
        try {
            const brand = await Brand.findById(brandId)
                .populate("founderId", "username email profile_url")
                .populate("team.userId", "username email profile_url")
                .lean();

            return brand;
        } catch (error) {
            const errorMessage =
                error instanceof Error ? error.message : 'Unknown error';

            logger.error(
                `Failed to get brand by id:${brandId} error: ${errorMessage}`
            );
            throw new AppError(errorMessage, 500);
        }
    }

    async getBrandByNameOrSlug(identifier: string) {
        try {
            return await Brand.find({
                $or: [
                    { name: identifier },
                    { slug: identifier }
                ]
            })
                .select("name slug category viewCount founderId")
                .populate("founderId", "username profile_url")
                .lean();
        } catch (error) {
            const errorMessage =
                error instanceof Error ? error.message : 'Unknown error';

            logger.error(`Failed to get brand by name or slug: ${errorMessage}`);
            throw new AppError(errorMessage, 500);
        }
    }
}