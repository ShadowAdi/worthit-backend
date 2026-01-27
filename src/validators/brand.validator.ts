import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { body, param } = require("express-validator");

export const createBrandValidator = [
    body("name")
        .notEmpty()
        .withMessage("Brand name is required")
        .isString()
        .withMessage("Brand name must be a string")
        .trim()
        .isLength({ min: 2, max: 100 })
        .withMessage("Brand name must be between 2 and 100 characters"),


    body("one_liner")
        .isString()
        .withMessage("Description must be a string")
        .trim(),

    body("description")
        .notEmpty()
        .withMessage("Description is required")
        .isString()
        .withMessage("Description must be a string")
        .trim()
        .isLength({ min: 10, max: 2000 })
        .withMessage("Description must be between 10 and 2000 characters"),

    body("slug")
        .notEmpty()
        .withMessage("Slug is required")
        .isString()
        .withMessage("Slug must be a string")
        .trim()
        .isLength({ min: 2, max: 100 })
        .withMessage("Slug must be between 2 and 100 characters")
        .matches(/^[a-z0-9-]+$/)
        .withMessage("Slug can only contain lowercase letters, numbers, and hyphens"),

    body("whyItExists")
        .notEmpty()
        .withMessage("Why it exists is required")
        .isString()
        .withMessage("Why it exists must be a string")
        .trim()
        .isLength({ min: 10, max: 2000 })
        .withMessage("Why it exists must be between 10 and 2000 characters"),

    body("images")
        .notEmpty()
        .withMessage("At least one image is required")
        .isArray({ min: 1 })
        .withMessage("Images must be an array with at least one item"),

    body("images.*.url")
        .notEmpty()
        .withMessage("Image URL is required")
        .isURL()
        .withMessage("Image URL must be a valid URL"),

    body("images.*.alt")
        .notEmpty()
        .withMessage("Image alt text is required")
        .isString()
        .withMessage("Image alt text must be a string")
        .trim()
        .isLength({ min: 2, max: 200 })
        .withMessage("Image alt text must be between 2 and 200 characters"),

    body("images.*.order")
        .notEmpty()
        .withMessage("Image order is required")
        .isInt({ min: 0 })
        .withMessage("Image order must be a non-negative integer"),

    body("demoVideo")
        .optional()
        .isURL()
        .withMessage("Demo video must be a valid URL"),

    body("category")
        .notEmpty()
        .withMessage("Category is required")
        .isArray()
        .withMessage("Category must be an array"),

    body("howToUse")
        .notEmpty()
        .withMessage("How to use is required")
        .isString()
        .withMessage("How to use must be a string")
        .trim()
        .isLength({ min: 10, max: 2000 })
        .withMessage("How to use must be between 10 and 2000 characters"),

    body("websiteUrl")
        .optional()
        .isURL()
        .withMessage("Website URL must be a valid URL"),

    body("socialLinks")
        .optional()
        .isArray()
        .withMessage("Social links must be an array"),

    body("socialLinks.*.platform")
        .optional()
        .isString()
        .withMessage("Social link platform must be a string")
        .trim()
        .isIn(["instagram", "linkedin", "twitter", "youtube", "other"])
        .withMessage("Social link platform must be one of: instagram, linkedin, twitter, youtube, other"),

    body("socialLinks.*.url")
        .optional()
        .isURL()
        .withMessage("Social link URL must be a valid URL"),

    body("status")
        .notEmpty()
        .withMessage("Status is required")
        .isString()
        .withMessage("Status must be a string")
        .isIn(["draft", "published"])
        .withMessage("Status must be either 'draft' or 'published'"),

    body("country")
        .notEmpty()
        .withMessage("Country is required")
        .isString()
        .withMessage("Country must be a string")
        .trim()
        .isLength({ min: 2, max: 100 })
        .withMessage("Country must be between 2 and 100 characters"),

    body("launchAt")
        .optional()
        .isISO8601()
        .withMessage("Launch date must be a valid ISO 8601 date"),

    body("team")
        .optional()
        .isArray()
        .withMessage("Team must be an array"),

    body("team.*.role")
        .optional()
        .isString()
        .withMessage("Team member role must be a string")
        .trim(),

    body("team.*.userId")
        .optional()
        .isMongoId()
        .withMessage("Team member user ID must be a valid MongoDB ObjectId"),

    body("team.*.isVerified")
        .optional()
        .isBoolean()
        .withMessage("Team member isVerified must be a boolean"),
];

export const updateBrandValidator = [
    body("name")
        .optional()
        .isString()
        .withMessage("Brand name must be a string")
        .trim()
        .isLength({ min: 2, max: 100 })
        .withMessage("Brand name must be between 2 and 100 characters"),

    body("description")
        .optional()
        .isString()
        .withMessage("Description must be a string")
        .trim()
        .isLength({ min: 10, max: 2000 })
        .withMessage("Description must be between 10 and 2000 characters"),

    body("one_liner")
        .optional()
        .isString()
        .withMessage("Description must be a string")
        .trim(),

    body("slug")
        .optional()
        .isString()
        .withMessage("Slug must be a string")
        .trim()
        .isLength({ min: 2, max: 100 })
        .withMessage("Slug must be between 2 and 100 characters")
        .matches(/^[a-z0-9-]+$/)
        .withMessage("Slug can only contain lowercase letters, numbers, and hyphens"),

    body("whyItExists")
        .optional()
        .isString()
        .withMessage("Why it exists must be a string")
        .trim()
        .isLength({ min: 10, max: 2000 })
        .withMessage("Why it exists must be between 10 and 2000 characters"),

    body("images")
        .optional()
        .isArray()
        .withMessage("Images must be an array"),

    body("images.*.url")
        .optional()
        .isURL()
        .withMessage("Image URL must be a valid URL"),

    body("images.*.alt")
        .optional()
        .isString()
        .withMessage("Image alt text must be a string")
        .trim()
        .isLength({ min: 2, max: 200 })
        .withMessage("Image alt text must be between 2 and 200 characters"),

    body("images.*.order")
        .optional()
        .isInt({ min: 0 })
        .withMessage("Image order must be a non-negative integer"),

    body("demoVideo")
        .optional()
        .isURL()
        .withMessage("Demo video must be a valid URL"),

    body("category")
        .notEmpty()
        .withMessage("Category is required")
        .isArray()
        .withMessage("Category must be an array"),

    body("howToUse")
        .optional()
        .isString()
        .withMessage("How to use must be a string")
        .trim()
        .isLength({ min: 10, max: 2000 })
        .withMessage("How to use must be between 10 and 2000 characters"),

    body("websiteUrl")
        .optional()
        .isURL()
        .withMessage("Website URL must be a valid URL"),

    body("socialLinks")
        .optional()
        .isArray()
        .withMessage("Social links must be an array"),

    body("socialLinks.*.platform")
        .optional()
        .isString()
        .withMessage("Social link platform must be a string")
        .trim()
        .isIn(["instagram", "linkedin", "twitter", "youtube", "other"])
        .withMessage("Social link platform must be one of: instagram, linkedin, twitter, youtube, other"),

    body("socialLinks.*.url")
        .optional()
        .isURL()
        .withMessage("Social link URL must be a valid URL"),

    body("country")
        .optional()
        .isString()
        .withMessage("Country must be a string")
        .trim()
        .isLength({ min: 2, max: 100 })
        .withMessage("Country must be between 2 and 100 characters"),

    body("launchAt")
        .optional()
        .isISO8601()
        .withMessage("Launch date must be a valid ISO 8601 date"),

    body("team")
        .optional()
        .isArray()
        .withMessage("Team must be an array"),

    body("team.*.role")
        .optional()
        .isString()
        .withMessage("Team member role must be a string")
        .trim()
        .isIn(["founder", "co-founder", "team-member"])
        .withMessage("Team member role must be one of: founder, co-founder, team-member"),

    body("team.*.userId")
        .optional()
        .isMongoId()
        .withMessage("Team member user ID must be a valid MongoDB ObjectId"),

    body("team.*.isVerified")
        .optional()
        .isBoolean()
        .withMessage("Team member isVerified must be a boolean"),
];

export const brandIdValidator = [
    param("brandId")
        .notEmpty()
        .withMessage("Brand ID is required")
        .isMongoId()
        .withMessage("Brand ID must be a valid MongoDB ObjectId"),
];

export const brandSlugValidator = [
    param("slug")
        .notEmpty()
        .withMessage("Slug is required")
];

export const brandIdentifierValidator = [
    param("identifier")
        .notEmpty()
        .withMessage("Brand identifier is required")
        .isString()
        .withMessage("Brand identifier must be a string")
        .trim()
        .isLength({ min: 2, max: 100 })
        .withMessage("Brand identifier must be between 2 and 100 characters"),
];

export const updateBrandTeamValidator = [
    body("team")
        .notEmpty()
        .withMessage("Team is required")
        .isArray()
        .withMessage("Team must be an array"),

    body("team.*.role")
        .notEmpty()
        .withMessage("Team member role is required")
        .isString()
        .withMessage("Team member role must be a string")
        .trim()
        .isIn(["founder", "co-founder", "team-member"])
        .withMessage("Team member role must be one of: founder, co-founder, team-member"),

    body("team.*.userId")
        .notEmpty()
        .withMessage("Team member user ID is required")
        .isMongoId()
        .withMessage("Team member user ID must be a valid MongoDB ObjectId"),

    body("team.*.isVerified")
        .optional()
        .isBoolean()
        .withMessage("Team member isVerified must be a boolean"),
];
