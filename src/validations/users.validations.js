const {body, param} = require("express-validator");

const createUserValidation = [
    body("name").notEmpty().withMessage("Name required!"),
    body("email").isEmail().withMessage("Valid email required!"),
    // body("password").isStrongPassword({minLength:8, minLowercase:2, minUppercase:1, minSymbols:1,minNumbers:1}).withMessage('Password does not meet strength requirements')
]

const updateUserValidation = [
    param("id").isMongoId().withMessage("Invalid user ID"),
    body("name").optional().notEmpty(),
    body("email").optional().notEmpty(),
    // body("password").optional()..isStrongPassword({minLength:8, minLowercase:2, minUppercase:1, minSymbols:1,minNumbers:1}).withMessage('Password does not meet strength requirements')
]

const deleteUserValidation = [
    param("id").isMongoId().withMessage("Invalid user ID")
]

module.exports.usersValidation = {
    createUserValidation,
    updateUserValidation,
    deleteUserValidation
}