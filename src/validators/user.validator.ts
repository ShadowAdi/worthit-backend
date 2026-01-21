import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { body, param } = require("express-validator");

export const createUserValidator = [
    body("username")
        .notEmpty()
        .withMessage("Username is required")
        .isString()
        .withMessage("Username must be a string")
        .trim()
        .isLength({ min: 3, max: 30 })
        .withMessage("Username must be between 3 and 30 characters")
        .matches(/^[a-zA-Z0-9_]+$/)
        .withMessage("Username can only contain letters, numbers, and underscores"),

    body("email")
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Please provide a valid email address")
        .normalizeEmail()
        .trim(),

    body("password")
        .notEmpty()
        .withMessage("Password is required")
        .isString()
        .withMessage("Password must be a string"),

    body("name")
        .optional()
        .isString()
        .withMessage("Name must be a string")
        .trim()
        .isLength({ min: 2, max: 50 })
        .withMessage("Name must be between 2 and 50 characters"),

    body("about")
        .optional()
        .isString()
        .withMessage("About must be a string")
        .trim()
        .isLength({ max: 500 })
        .withMessage("About must not exceed 500 characters"),

    body("profile_url")
        .optional()
        .isURL()
        .withMessage("Profile URL must be a valid URL"),

    body("social_links")
        .optional()
        .isArray()
        .withMessage("Social links must be an array"),

    body("social_links.*.key")
        .optional()
        .isString()
        .withMessage("Social link key must be a string")
        .trim()
        .notEmpty()
        .withMessage("Social link key cannot be empty"),

    body("social_links.*.value")
        .optional()
        .isString()
        .withMessage("Social link value must be a string")
        .trim()
        .notEmpty()
        .withMessage("Social link value cannot be empty")
];

export const updateUserValidator = [
    body("about")
        .optional()
        .isString()
        .withMessage("About must be a string")
        .trim()
        .isLength({ max: 500 })
        .withMessage("About must not exceed 500 characters"),

    body("profile_url")
        .optional()
        .isURL()
        .withMessage("Profile URL must be a valid URL"),

    body("social_links")
        .optional()
        .isArray()
        .withMessage("Social links must be an array"),

    body("social_links.*.key")
        .optional()
        .isString()
        .withMessage("Social link key must be a string")
        .trim()
        .notEmpty()
        .withMessage("Social link key cannot be empty"),

    body("social_links.*.value")
        .optional()
        .isString()
        .withMessage("Social link value must be a string")
        .trim()
        .notEmpty()
        .withMessage("Social link value cannot be empty")
];

export const userIdValidator = [
    param("userId")
        .notEmpty()
        .withMessage("User ID is required")
        .isMongoId()
        .withMessage("Invalid user ID format")
];
