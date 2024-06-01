const crypto = require("crypto");

exports.passwordResetToken = (bytes = 32) => {
    return crypto.randomBytes(bytes).toString("hex");
};

exports.checkRecentToken = (tokenDate, duration = 5) => {
    const date = new Date(Date.now() - duration * 60 * 1000);
    return tokenDate - date; // t > 0 => wait t, t < 0 => create new token
};

exports.checkExpiration = (date) => {
    return date < new Date();
};
