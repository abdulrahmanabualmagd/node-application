const router = require("express").Router();
const { homeController } = require("../controllers/homeController");
const { checkAuthenticity } = require("../middlewares/authMiddleware");

router.get("/", checkAuthenticity, homeController);

module.exports = router;
