const router = require("express").Router();
const { loginController, registerController, resetPasswordController } = require("../controllers/authController");
const {
    userResetPassValidationRules,
    userRegisterValidationRules,
    userLoginValidationRules,
    validateInputs,
} = require("../validators/userValidators");

// Login
router.post("/login", userLoginValidationRules(), validateInputs, loginController);
// Register
router.post("/register", userRegisterValidationRules(), validateInputs, registerController);
// Reset
router.post("/reset", userResetPassValidationRules(), validateInputs, resetPasswordController);

module.exports = router;
