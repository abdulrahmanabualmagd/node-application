const { homeService } = require("../services/homeService");

exports.homeController = async (req, res, next) => {
    try {
        const data = await homeService(req, res, next);
        res.send(req.decodedToken);
    } catch (err) {
        res.send(err);
    }
};
