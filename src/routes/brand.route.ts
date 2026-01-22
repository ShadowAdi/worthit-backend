import { Router } from "express";
import { BrandController } from "../controllers/brand.controller";
import { validate } from "../middlewares/validation.middleware";
import { AuthMiddleware } from "../middlewares/auth.middleware";

export const brandRouter = Router();

// Create a new brand (requires authentication)
brandRouter.post(
    "/",
    AuthMiddleware,
    BrandController.createBrand.bind(BrandController)
);

// Get all brands
brandRouter.get("/", BrandController.getAllBrands.bind(BrandController));

// Get brand by name or slug
brandRouter.get(
    "/search/:identifier",
    BrandController.getBrandByNameOrSlug.bind(BrandController)
);

// Get brand by ID
brandRouter.get(
    "/:brandId",
    BrandController.getBrand.bind(BrandController)
);

// Update brand by ID (requires authentication)
brandRouter.patch(
    "/:brandId",
    AuthMiddleware,
    BrandController.updateBrand.bind(BrandController)
);

// Delete brand by ID (requires authentication)
brandRouter.delete(
    "/:brandId",
    AuthMiddleware,
    BrandController.deleteBrand.bind(BrandController)
);

// Increase brand view count
brandRouter.post(
    "/:brandId/view",
    BrandController.increaseBrandView.bind(BrandController)
);
