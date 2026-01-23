import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { body, param } = require("express-validator");

export const createReviewValidator = [
    body("usageStatus")
        .notEmpty()
        .withMessage("Usage status is required")
        .isString()
        .withMessage("Usage status must be a string")
        .isIn(["used", "gifted", "not_used"])
        .withMessage("Usage status must be one of: used, gifted, not_used"),

    body("worthTheMoney")
        .notEmpty()
        .withMessage("Worth the money field is required")
        .isBoolean()
        .withMessage("Worth the money must be a boolean value"),

    body("biggestDisappointment")
        .notEmpty()
        .withMessage("Biggest disappointment is required")
        .isString()
        .withMessage("Biggest disappointment must be a string")
        .trim()
        .isLength({ min: 10, max: 1000 })
        .withMessage("Biggest disappointment must be between 10 and 1000 characters"),

    body("whoShouldNotBuy")
        .notEmpty()
        .withMessage("Who should not buy is required")
        .isString()
        .withMessage("Who should not buy must be a string")
        .trim()
        .isLength({ min: 10, max: 1000 })
        .withMessage("Who should not buy must be between 10 and 1000 characters"),

    body("recommendation")
        .notEmpty()
        .withMessage("Recommendation is required")
        .isString()
        .withMessage("Recommendation must be a string")
        .isIn(["recommend", "not_recommend"])
        .withMessage("Recommendation must be either 'recommend' or 'not_recommend'"),

    body("additionalNotes")
        .optional()
        .isString()
        .withMessage("Additional notes must be a string")
        .trim()
        .isLength({ max: 2000 })
        .withMessage("Additional notes must not exceed 2000 characters")
];

export const updateReviewValidator = [
    body("usageStatus")
        .optional()
        .isString()
        .withMessage("Usage status must be a string")
        .isIn(["used", "gifted", "not_used"])
        .withMessage("Usage status must be one of: used, gifted, not_used"),

    body("worthTheMoney")
        .optional()
        .isBoolean()
        .withMessage("Worth the money must be a boolean value"),

    body("biggestDisappointment")
        .optional()
        .isString()
        .withMessage("Biggest disappointment must be a string")
        .trim()
        .isLength({ min: 10, max: 1000 })
        .withMessage("Biggest disappointment must be between 10 and 1000 characters"),

    body("whoShouldNotBuy")
        .optional()
        .isString()
        .withMessage("Who should not buy must be a string")
        .trim()
        .isLength({ min: 10, max: 1000 })
        .withMessage("Who should not buy must be between 10 and 1000 characters"),

    body("recommendation")
        .optional()
        .isString()
        .withMessage("Recommendation must be a string")
        .isIn(["recommend", "not_recommend"])
        .withMessage("Recommendation must be either 'recommend' or 'not_recommend'"),

    body("additionalNotes")
        .optional()
        .isString()
        .withMessage("Additional notes must be a string")
        .trim()
        .isLength({ max: 2000 })
        .withMessage("Additional notes must not exceed 2000 characters")
];

export const reviewIdValidator = [
    param("reviewId")
        .notEmpty()
        .withMessage("Review ID is required")
        .isMongoId()
        .withMessage("Invalid review ID format")
];

export const brandIdValidator = [
    param("brandId")
        .notEmpty()
        .withMessage("Brand ID is required")
        .isMongoId()
        .withMessage("Invalid brand ID format")
];

export const userIdValidator = [
    param("userId")
        .notEmpty()
        .withMessage("User ID is required")
        .isMongoId()
        .withMessage("Invalid user ID format")
];
