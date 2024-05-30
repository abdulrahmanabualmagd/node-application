const router = require("express").Router();
const { loginController, registerController } = require("../controllers/authController");
const { userRegisterValidationRules, userLoginValidationRules, validateInputs } = require("../validators/userValidators");

router.get("/login", loginController);

router.get("/register", registerController);

// Register
router.post("/register", userRegisterValidationRules(), validateInputs, registerController);

// Login
router.post("/login", userLoginValidationRules(), validateInputs, loginController);

module.exports = router;
