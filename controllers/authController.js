const services = require("./../services/authService");
const { passwordResetMail } = require("../services/mailerService");

exports.loginController = async (req, res, next) => {
    try {
        const token = await services.loginService(req, res);
        res.send(token);
    } catch (err) {
        next(err);
    }
};

exports.registerController = async (req, res, next) => {
    try {
        const user = await services.registerService(req, res, next);
        res.send(user);
    } catch (err) {
        next(err);
    }
};

exports.resetPasswordGetTokenController = async (req, res, next) => {
    try {
        // Get Token for User
        const token = await services.resetPasswordGetTokenService(req, res, next);

        // Send email for user
        await passwordResetMail(req.body.email, token);
        await res.send(token);
    } catch (err) {
        next(err);
    }
};

exports.resetPasswordVerifyTokenController = async (req, res, next) => {
    try {
        const token = await services.resetPasswordVerifyTokenService(req, res, next);
        res.send(token);
    } catch (err) {
        next(err);
    }
};
