const { body, validationResult } = require("express-validator");

exports.userRegisterValidationRules = () => [
    body("username").notEmpty().withMessage("Username is required"),
    body("email").isEmail().withMessage("Email is invalid"),
    body("password").notEmpty().withMessage("Password is required").isStrongPassword().withMessage("Weak Password!"),
    body("firstName")
        .notEmpty()
        .withMessage("First name is required")
        .isLength({ min: 3, max: 15 })
        .withMessage("First name must be between 3 and 15 characters"),
    body("lastName")
        .notEmpty()
        .withMessage("Last name is required")
        .isLength({ min: 3, max: 15 })
        .withMessage("Last name must be between 3 and 15 characters"),
    body("phone")
        .optional()
        .matches(/^[0-9]+$/)
        .withMessage("Phone number must contain only numbers"),
    body("address").optional(),
];

exports.userLoginValidationRules = () => [
    body("email").notEmpty().withMessage("Email is Required").isEmail().withMessage("Email is invalid"),
    body("password").notEmpty().withMessage("Password is required").isStrongPassword().withMessage("wrong Pass!"),
];

exports.userResetPassValidationRules = () => [
    body("email").notEmpty().withMessage("Email is Required").isEmail().withMessage("Email is invalid"),
];

exports.validateInputs = (req, res, next) => {
    // Get all recorded errors
    const errors = validationResult(req);

    // Check error existence
    if (errors.isEmpty()) {
        return next();
    }
    
    const recordedErrors = errors.array().map((err) => ({
        param: err.param,
        msg: err.msg,
    }));

    const error = new Error("Input Validation Error");
    error.status = 422;
    error.recordedErrors = recordedErrors;

    next(error);
};
