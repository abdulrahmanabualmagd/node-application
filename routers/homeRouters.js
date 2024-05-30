const router = require("express").Router();
const { homeController } = require("../controllers/homeController");
const { checkAuthenticity } = require("../services/authService");

router.get("/", checkAuthenticity, homeController);

module.exports = router;
