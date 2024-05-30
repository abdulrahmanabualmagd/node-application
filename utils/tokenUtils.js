const jwt = require("jsonwebtoken");
require("dotenv").config();

// Json Web Token
exports.createToken = (payload) => {
    try {
        // Check Environment Variables
        if (
            !process.env.JWT_ALGORITHM ||
            !process.env.JWT_ISSUER ||
            !process.env.JWT_AUDIENCE ||
            !process.env.JWT_SECRET
        ) {
            throw Error("Missing Environment Variables!");
        }
        // Options
        const options = {
            algorithm: process.env.JWT_ALGORITHM,
            expiresIn: process.env.JWT_EXPIRATION,
            issuer: process.env.JWT_ISSUER,
            audience: process.env.JWT_AUDIENCE,
        };

        // Return Generated sToken
        return jwt.sign(payload, process.env.JWT_SECRET, options);
    } catch (err) {
        throw err;
    }
};

// Returns the decoded payload (On Success Only)
exports.verifyToken = (token) => {
    try {
        // Check Environment Variables
        if (
            !process.env.JWT_ALGORITHM ||
            !process.env.JWT_ISSUER ||
            !process.env.JWT_AUDIENCE ||
            !process.env.JWT_SECRET
        ) {
            throw Error("Missing Environment Variables!");
        }

        // Prepare Options
        const options = {
            algorithms: process.env.JWT_ALGORITHM,
            issuer: process.env.JWT_ISSUER,
            audience: process.env.JWT_AUDIENCE,
            // clockTolerance: 60, //
        };

        // Get Secret Key
        const secretKey = process.env.JWT_SECRET;

        // Return Verification Result
        return jwt.verify(token, secretKey, options);
    } catch (err) {
        throw err;
    }
};
