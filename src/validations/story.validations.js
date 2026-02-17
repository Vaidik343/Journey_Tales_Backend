const {body, param} = require('express-validator');

const createStoriesValidations = [
    param("tripId").notEmpty().withMessage("Trip Id required!")
    .isMongoId().withMessage("Invalid Id!"),

    body("placeName").notEmpty().withMessage("Place name required!")
    .isLength({min:2}).withMessage("Place name must be at least 3 character"),

    body("story").optional().isLength({max:1000}).withMessage("story cannot exceed 1000 characters"),

    body("visitDate").optional().isISO8601().withMessage("visitDate must be a valid date"),
]

const updateStoriesValidation = [
     param("id")
    .isMongoId().withMessage("Invalid Id!"),

        body("placeName").optional()
    .isLength({min:3}).withMessage("Place name must be at least 3 character"),

        body("story").optional().isLength({min:2}).withMessage("Story must be at least 3 character"),

    body("visitDate").optional().isISO8601()
]

const deleteStoriedValidation = [
     param("id").notEmpty().withMessage("Trip Id required!")

]

module.exports.storyValidations = {
    createStoriesValidations, updateStoriesValidation, deleteStoriedValidation
}