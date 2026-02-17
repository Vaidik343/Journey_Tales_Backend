const {body, param, check} = require("express-validator");

const createTripValidations = [
    param("userId").notEmpty().withMessage("User Id required!")
    .isMongoId().withMessage("Invalid userId"),
    
    body("title").notEmpty().withMessage("Title required!"),
    
    body("startDate").optional().isISO8601().withMessage("Start date must be a valid date"),
    
    body("endDate").optional().isISO8601().withMessage("End date must be a valid date").custom( (value, {req}) => {
        if(req.body.startDate && value < req.body.startDate)
        {
            throw new Error("End date must be after start date")
        }
    }),

    body("summary").optional().isLength({max: 500}).withMessage("Summary max length is 500 characters")
]

const updateTripValidations = [
    param('id').isMongoId().withMessage("Invalid userId"),
    body('title').optional().isLength({min:3}).withMessage("Title must be at least 3 character"),

     body("startDate").optional().isISO8601().withMessage("Start date must be a valid date"),
    
    body("endDate").optional().isISO8601().withMessage("End date must be a valid date").custom( (value, {req}) => {
        if(req.body.startDate && value < req.body.startDate)
        {
            throw new Error("End date must be after start date")
        }
    }),

    body("summary").optional().isLength({max: 500}).withMessage("Summary max length is 500 characters")
]

const deleteTripValidation = [
       param('id').isMongoId().withMessage("Invalid userId"),
]

module.exports.tripValidations = {
    createTripValidations, updateTripValidations, deleteTripValidation
}