import { Router } from "express";
import { BrandController } from "../controllers/brand.controller";
import { validate } from "../middlewares/validation.middleware";
import { AuthMiddleware, OptionalAuthMiddleware } from "../middlewares/auth.middleware";
import {
    createBrandValidator,
    updateBrandValidator,
    brandIdValidator,
    brandIdentifierValidator,
    brandSlugValidator,
    updateBrandTeamValidator,
} from "../validators/brand.validator";

export const brandRouter = Router();

// Create a new brand (requires authentication)
brandRouter.post(
    "/",
    AuthMiddleware,
    createBrandValidator,
    validate,
    BrandController.createBrand.bind(BrandController)
);

// Get all brands
brandRouter.get("/", BrandController.getAllBrands.bind(BrandController));

// Get brand by name or slug
brandRouter.get(
    "/search/:identifier",
    brandIdentifierValidator,
    validate,
    BrandController.getBrandByNameOrSlug.bind(BrandController)
);

// Get brand by slug
brandRouter.get(
    "/slug/:slug",
    OptionalAuthMiddleware,
    brandSlugValidator,
    validate,
    BrandController.getBrandBySlug.bind(BrandController)
);

// Get brand by ID
brandRouter.get(
    "/:brandId",
    brandIdValidator,
    validate,
    BrandController.getBrand.bind(BrandController)
);

// Update brand by ID (requires authentication)
brandRouter.patch(
    "/:brandId",
    AuthMiddleware,
    brandIdValidator,
    updateBrandValidator,
    validate,
    BrandController.updateBrand.bind(BrandController)
);

// Delete brand by ID (requires authentication)
brandRouter.delete(
    "/:brandId",
    AuthMiddleware,
    brandIdValidator,
    validate,
    BrandController.deleteBrand.bind(BrandController)
);

// Increase brand view count
brandRouter.post(
    "/:brandId/view",
    brandIdValidator,
    validate,
    BrandController.increaseBrandView.bind(BrandController)
);

// Update brand team members (requires authentication)
brandRouter.patch(
    "/:brandId/team",
    AuthMiddleware,
    brandIdValidator,
    updateBrandTeamValidator,
    validate,
    BrandController.updateBrandTeam.bind(BrandController)
);
