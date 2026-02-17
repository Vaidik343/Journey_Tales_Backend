const { body, param } = require("express-validator");

const createBucketListValidations = [
  body("tripId")
    .notEmpty().withMessage("Trip Id required!")
    .isMongoId().withMessage("Invalid Id"),

  body("name")
    .notEmpty().withMessage("Name required!")
    .isLength({ min: 3 }).withMessage("Name must be at least 3 characters!")
    .isLength({ max: 100 }).withMessage("Name cannot exceed 100 characters"),

  body("quantity")
    .optional()
    .isInt({ min: 1 }).withMessage("Quantity must be a positive number!"),

  body("note")
    .optional()
    .isLength({ max: 300 }).withMessage("Note must be max 300 characters"),
];

const updateBucketListValidations = [
  param("id")
    .isMongoId().withMessage("Invalid Id"),

  body("name")
    .optional()
    .isLength({ min: 3 }).withMessage("Name must be at least 3 characters!")
    .isLength({ max: 100 }).withMessage("Name cannot exceed 100 characters"),

  body("quantity")
    .optional()
    .isInt({ min: 1 }).withMessage("Quantity must be a positive number!"),

  body("note")
    .optional()
    .isLength({ max: 300 }).withMessage("Note must be max 300 characters"),
];

const deleteBucketListValidations = [
  param("id")
    .isMongoId().withMessage("Invalid Id"),
];

module.exports.bucketlistValidations = {
  createBucketListValidations,
  updateBucketListValidations,
  deleteBucketListValidations,
};
