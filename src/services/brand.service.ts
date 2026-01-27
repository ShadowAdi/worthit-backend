import { Types } from "mongoose";
import { logger } from "../config/logger";
import { Brand } from "../models/brand.model";
import { CreateBrandDto } from "../types/brand/brand-create.dto";
import { AppError } from "../utils/AppError";
import { UpdateBrandDto } from "../types/brand/brand-update.dto";
import { ReviewService } from "./review.service";

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
                .populate("team.userId", "username email profile_url")
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

    async getBrandBySlug(slug: string) {
        try {
            const brand = await Brand.findOne({ slug: slug })
                .populate("founderId", "username email profile_url")
                .populate("team.userId", "username email profile_url")
                .lean();

            if (!brand) {
                logger.error(`Failed to get all brand`)
                throw new AppError(`Failed to get all brand`, 400)
            }

            const reviews = await ReviewService.getAllReview(brand.id)

            return { brand, reviews };
        } catch (error) {
            const errorMessage =
                error instanceof Error ? error.message : 'Unknown error';

            logger.error(
                `Failed to get brand by slug:${slug} error: ${errorMessage}`
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

    async deleteBrand(brandId: string, userId: string) {
        try {
            const isBrandExists = await Brand.exists({
                _id: brandId,
                founderId: userId
            })

            if (!isBrandExists) {
                logger.error(`Failed to get the brand`)
                console.error(`Failed to get the brand`)
                throw new AppError(`Failed to get the brand`, 400)
            }

            await Brand.deleteOne({
                _id: brandId
            })
            return "Brand deleted succussfully"
        } catch (error) {
            const errorMessage =
                error instanceof Error ? error.message : 'Unknown error';

            logger.error(`Failed to delete brand by id: ${errorMessage}`);
            throw new AppError(errorMessage, 500);
        }
    }

    async updateBrand(
        brandId: string,
        userId: string,
        updateBrandPayload: UpdateBrandDto
    ) {
        try {
            const brandExists = await Brand.exists({
                _id: brandId,
                founderId: userId
            });

            if (!brandExists) {
                throw new AppError(
                    "Brand not found or you are not authorized",
                    403
                );
            }

            if (
                updateBrandPayload.launchAt &&
                new Date(updateBrandPayload.launchAt) < new Date()
            ) {
                throw new AppError(
                    "Launch date cannot be in the past",
                    400
                );
            }

            const updateData: any = {};

            if (updateBrandPayload.name !== undefined) updateData.name = updateBrandPayload.name;
            if (updateBrandPayload.description !== undefined) updateData.description = updateBrandPayload.description;
            if (updateBrandPayload.slug !== undefined) updateData.slug = updateBrandPayload.slug;
            if (updateBrandPayload.whyItExists !== undefined) updateData.whyItExists = updateBrandPayload.whyItExists;
            if (updateBrandPayload.demoVideo !== undefined) updateData.demoVideo = updateBrandPayload.demoVideo;
            if (updateBrandPayload.category !== undefined) updateData.category = updateBrandPayload.category;
            if (updateBrandPayload.howToUse !== undefined) updateData.howToUse = updateBrandPayload.howToUse;
            if (updateBrandPayload.websiteUrl !== undefined) updateData.websiteUrl = updateBrandPayload.websiteUrl;
            if (updateBrandPayload.launchAt !== undefined) updateData.launchAt = updateBrandPayload.launchAt;

            if (updateBrandPayload.country !== undefined) {
                updateData.country = updateBrandPayload.country;
                updateData.isIndianBrand = updateBrandPayload.country.toLowerCase().trim() === "india";
            }

            if (updateBrandPayload.images !== undefined) {
                updateData.images = updateBrandPayload.images;
            }
            if (updateBrandPayload.socialLinks !== undefined) {
                updateData.socialLinks = updateBrandPayload.socialLinks;
            }

            const updatedBrand = await Brand.findByIdAndUpdate(
                brandId,
                { $set: updateData },
                {
                    new: true,
                    runValidators: true
                }
            ).lean();

            return updatedBrand;
        } catch (error) {
            const errorMessage =
                error instanceof Error ? error.message : "Unknown error";

            logger.error(`Failed to update brand: ${errorMessage}`);
            throw new AppError(errorMessage, 500);
        }
    }

    async increaseBrandView(
        brandId: string
    ) {
        try {
            const updatedBrand = await Brand.findByIdAndUpdate(
                brandId,
                {
                    $inc: {
                        viewCount: 1
                    }
                },
                {
                    new: true,
                }
            ).lean();

            if (!updatedBrand) {
                logger.error(`Brand not found: ${brandId}`)
                throw new AppError("Brand not found", 404);
            }

            return updatedBrand;
        } catch (error) {
            const errorMessage =
                error instanceof Error ? error.message : "Unknown error";

            logger.error(`Failed to increase the view count of brand: ${errorMessage}`);
            throw new AppError(errorMessage, 500);
        }
    }

}

export const BrandService = new BrandClassService()