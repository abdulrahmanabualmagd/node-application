const router = require("express").Router();
const auth = require("../controllers/authController");
const validator = require("../validators/userValidators");

// Login
router.post("/login", validator.userLoginValidationRules(), validator.validateInputs, auth.loginController);
// Register
router.post("/register", validator.userRegisterValidationRules(), validator.validateInputs, auth.registerController);
// Reset Get Token
router.post("/reset", validator.userResetPassValidationRules(), validator.validateInputs, auth.resetPasswordGetTokenController);
// Reset Verify Token
router.post("/reset/:token", auth.resetPasswordVerifyTokenController);

module.exports = router;
