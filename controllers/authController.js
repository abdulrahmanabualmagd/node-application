const path = require("path");
const { loginService, registerService } = require("./../services/authService");

exports.loginController = async (req, res, next) => {
    try {
        const token = await loginService(req, res);
        res.send(token);
    } catch (err) {
        next(err);
    }
};

exports.registerController = async (req, res, next) => {
    try {
        const user = await registerService(req, res, next);
        res.send(user);
    } catch (err) {
        next(err);
    }
};
