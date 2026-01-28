import { Request, Response, NextFunction } from "express";
import { BrandService } from "../services/brand.service.js";
import type { CreateBrandDto } from "../types/brand/brand-create.dto.js";
import type { UpdateBrandDto } from "../types/brand/brand-update.dto.js";
import { logger } from "../config/logger.js";
import { AppError } from "../utils/AppError.js";

class BrandControllerClass {
    async createBrand(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.user?.id;

            if (!userId) {
                logger.error(`User ID not found in request`);
                console.error(`User ID not found in request`);
                throw new AppError("User ID not found in request", 404);
            }

            logger.info(`Creating brand for user: ${userId}`);
            console.log(`Creating brand for user: ${userId}`);

            const payload: CreateBrandDto = req.body;
            const newBrand = await BrandService.createBrand(payload, userId);

            logger.info(`Brand created successfully: ${newBrand._id}`);
            console.log(`Brand created successfully: ${newBrand._id}`);

            res.status(201).json({
                success: true,
                message: "Brand created successfully",
                data: newBrand
            });
        } catch (error: any) {
            logger.error(`Failed to create brand controller: ${error.message}`);
            console.error(`Failed to create brand controller: ${error.message}`);
            next(error);
        }
    }

    async getAllBrands(req: Request, res: Response, next: NextFunction) {
        try {
            logger.info(`Fetching all brands`);
            console.log(`Fetching all brands`);

            const result = await BrandService.getAllBrands();

            logger.info(`Retrieved ${result.totalBrands} brands successfully`);
            console.log(`Retrieved ${result.totalBrands} brands successfully`);

            res.status(200).json({
                success: true,
                message: "Brands retrieved successfully",
                data: result
            });
        } catch (error: any) {
            logger.error(`Failed to get all brands controller: ${error.message}`);
            console.error(`Failed to get all brands controller: ${error.message}`);
            next(error);
        }
    }

    async getUserBrands(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.user?.id;

            if (!userId) {
                logger.error(`User ID not found in request`);
                console.error(`User ID not found in request`);
                throw new AppError("User ID not found in request", 401);
            }

            logger.info(`Fetching brands for user: ${userId}`);
            console.log(`Fetching brands for user: ${userId}`);

            const result = await BrandService.getUserBrands(userId);

            logger.info(`Retrieved ${result.totalBrands} brands for user: ${userId}`);
            console.log(`Retrieved ${result.totalBrands} brands for user: ${userId}`);

            res.status(200).json({
                success: true,
                message: "User brands retrieved successfully",
                data: result
            });
        } catch (error: any) {
            logger.error(`Failed to get user brands controller: ${error.message}`);
            console.error(`Failed to get user brands controller: ${error.message}`);
            next(error);
        }
    }

    async getBrand(req: Request, res: Response, next: NextFunction) {
        try {
            const { brandId } = req.params;

            if (!brandId) {
                logger.error(`Brand ID not provided`);
                console.error(`Brand ID not provided`);
                throw new AppError("Brand ID is required", 404);
            }

            logger.info(`Fetching brand with ID: ${brandId}`);
            console.log(`Fetching brand with ID: ${brandId}`);

            const brand = await BrandService.getBrand(brandId as string);

            if (!brand) {
                logger.error(`Brand not found: ${brandId}`);
                console.error(`Brand not found: ${brandId}`);
                throw new AppError("Brand not found", 404);
            }

            logger.info(`Brand retrieved successfully: ${brandId}`);
            console.log(`Brand retrieved successfully: ${brandId}`);

            res.status(200).json({
                success: true,
                message: "Brand retrieved successfully",
                data: brand
            });
        } catch (error: any) {
            logger.error(`Failed to get brand controller: ${error.message}`);
            console.error(`Failed to get brand controller: ${error.message}`);
            next(error);
        }
    }

    async getBrandBySlug(req: Request, res: Response, next: NextFunction) {
        try {
            const { slug } = req.params;
            const userId = req.user?.id; // Optional - will be undefined if not authenticated

            if (!slug) {
                logger.error(`Slug not provided`);
                console.error(`Slug not provided`);
                throw new AppError("Slug not provided", 404);
            }

            const {brand,reviews} = await BrandService.getBrandBySlug(slug as string, userId);

            if (!brand) {
                logger.error(`Brand not found: ${slug}`);
                console.error(`Brand not found: ${slug}`);
                throw new AppError("Brand not found", 404);
            }

            res.status(200).json({
                success: true,
                message: "Brand retrieved successfully",
                data: {brand,reviews}
            });
        } catch (error: any) {
            logger.error(`Failed to get brand controller: ${error.message}`);
            console.error(`Failed to get brand controller: ${error.message}`);
            next(error);
        }
    }

    async getBrandByNameOrSlug(req: Request, res: Response, next: NextFunction) {
        try {
            const { identifier } = req.params;

            if (!identifier) {
                logger.error(`Brand identifier not provided`);
                console.error(`Brand identifier not provided`);
                throw new AppError("Brand name or slug is required", 404);
            }

            logger.info(`Fetching brand by identifier: ${identifier}`);
            console.log(`Fetching brand by identifier: ${identifier}`);

            const brands = await BrandService.getBrandByNameOrSlug(identifier as string);

            logger.info(`Brand(s) retrieved successfully for identifier: ${identifier}`);
            console.log(`Brand(s) retrieved successfully for identifier: ${identifier}`);

            res.status(200).json({
                success: true,
                message: "Brand(s) retrieved successfully",
                data: brands
            });
        } catch (error: any) {
            logger.error(`Failed to get brand by name or slug controller: ${error.message}`);
            console.error(`Failed to get brand by name or slug controller: ${error.message}`);
            next(error);
        }
    }

    async deleteBrand(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.user?.id;
            const { brandId } = req.params;

            if (!userId) {
                logger.error(`User ID not found in request`);
                console.error(`User ID not found in request`);
                throw new AppError("User ID not found in request", 404);
            }

            if (!brandId) {
                logger.error(`Brand ID not provided`);
                console.error(`Brand ID not provided`);
                throw new AppError("Brand ID is required", 404);
            }

            logger.info(`Deleting brand ${brandId} by user: ${userId}`);
            console.log(`Deleting brand ${brandId} by user: ${userId}`);

            const message = await BrandService.deleteBrand(brandId as string, userId);

            logger.info(`Brand deleted successfully: ${brandId}`);
            console.log(`Brand deleted successfully: ${brandId}`);

            res.status(200).json({
                success: true,
                message: message
            });
        } catch (error: any) {
            logger.error(`Failed to delete brand controller: ${error.message}`);
            console.error(`Failed to delete brand controller: ${error.message}`);
            next(error);
        }
    }

    async updateBrand(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.user?.id;
            const { brandId } = req.params;

            if (!userId) {
                logger.error(`User ID not found in request`);
                console.error(`User ID not found in request`);
                throw new AppError("User ID not found in request", 404);
            }

            if (!brandId) {
                logger.error(`Brand ID not provided`);
                console.error(`Brand ID not provided`);
                throw new AppError("Brand ID is required", 404);
            }

            const payload: UpdateBrandDto = req.body;
            const updatedBrand = await BrandService.updateBrand(brandId as string, userId, payload);

            res.status(200).json({
                success: true,
                message: "Brand updated successfully",
                data: updatedBrand
            });
        } catch (error: any) {
            logger.error(`Failed to update brand controller: ${error.message}`);
            console.error(`Failed to update brand controller: ${error.message}`);
            next(error);
        }
    }

    async increaseBrandView(req: Request, res: Response, next: NextFunction) {
        try {
            const { brandId } = req.params;

            if (!brandId) {
                logger.error(`Brand ID not provided`);
                console.error(`Brand ID not provided`);
                throw new AppError("Brand ID is required", 404);
            }

            logger.info(`Increasing view count for brand: ${brandId}`);
            console.log(`Increasing view count for brand: ${brandId}`);

            const updatedBrand = await BrandService.increaseBrandView(brandId as string);

            logger.info(`Brand view count increased successfully: ${brandId}`);
            console.log(`Brand view count increased successfully: ${brandId}`);

            res.status(200).json({
                success: true,
                message: "Brand view count increased successfully",
                data: updatedBrand
            });
        } catch (error: any) {
            logger.error(`Failed to increase brand view controller: ${error.message}`);
            console.error(`Failed to increase brand view controller: ${error.message}`);
            next(error);
        }
    }

    async updateBrandTeam(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.user?.id;
            const { brandId } = req.params;
            const { team } = req.body;

            if (!userId) {
                logger.error(`User ID not found in request`);
                console.error(`User ID not found in request`);
                throw new AppError("User ID not found in request", 404);
            }

            if (!brandId) {
                logger.error(`Brand ID not provided`);
                console.error(`Brand ID not provided`);
                throw new AppError("Brand ID is required", 404);
            }

            if (!team || !Array.isArray(team)) {
                logger.error(`Invalid team data provided`);
                console.error(`Invalid team data provided`);
                throw new AppError("Team must be an array", 400);
            }

            logger.info(`Updating team for brand ${brandId} by user: ${userId}`);
            console.log(`Updating team for brand ${brandId} by user: ${userId}`);

            const updatedBrand = await BrandService.updateBrandTeam(
                brandId as string,
                userId,
                team
            );

            logger.info(`Brand team updated successfully: ${brandId}`);
            console.log(`Brand team updated successfully: ${brandId}`);

            res.status(200).json({
                success: true,
                message: "Brand team updated successfully",
                data: updatedBrand
            });
        } catch (error: any) {
            logger.error(`Failed to update brand team controller: ${error.message}`);
            console.error(`Failed to update brand team controller: ${error.message}`);
            next(error);
        }
    }
}

export const BrandController = new BrandControllerClass();
