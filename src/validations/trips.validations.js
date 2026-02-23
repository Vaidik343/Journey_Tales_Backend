const {body, param, check} = require("express-validator");

const createTripValidations = [

    
    body("title").notEmpty().withMessage("Title required!"),
    
    body("startDate").notEmpty().withMessage("Start date required!").isISO8601().withMessage("Start date must be a valid date (YYYY-MM-DD)"),
    
    body("endDate").notEmpty().withMessage("End date required!").isISO8601().withMessage("End date must be a valid date (YYYY-MM-DD)").custom((value, {req}) => {
        if(req.body.startDate) {
            const start = new Date(req.body.startDate);
            const end = new Date(value);
            if(end <= start) {
                throw new Error("End date must be after start date");
            }
        }
        return true;
    }),

    body("summary").optional().isLength({max: 500}).withMessage("Summary max length is 500 characters")
]

const updateTripValidations = [
    param('id').isMongoId().withMessage("Invalid userId"),
    body('title').optional().isLength({min:3}).withMessage("Title must be at least 3 character"),

    body("startDate").optional().isISO8601().withMessage("Start date must be a valid date"),
    
    body("endDate").optional().isISO8601().withMessage("End date must be a valid date").custom((value, {req}) => {
        if(req.body.startDate) {
            const start = new Date(req.body.startDate);
            const end = new Date(value);
            if(end <= start) {
                throw new Error("End date must be after start date");
            }
        }
        return true;
    }),

    body("summary").optional().isLength({max: 500}).withMessage("Summary max length is 500 characters")
]

const deleteTripValidation = [
       param('id').isMongoId().withMessage("Invalid userId"),
]

module.exports.tripValidations = {
    createTripValidations, updateTripValidations, deleteTripValidation
}