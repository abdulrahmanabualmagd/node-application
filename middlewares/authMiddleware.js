// This is a middleware we return next(err) instead of throw err 
exports.checkAuthenticity = async (req, res, next) => {
    try {
        // Parse Token from cookie [bearer]
        const headerAuth = req.headers["authorization"];

        if (!headerAuth) throw new Error("Token Not Found!");

        const token = headerAuth.split(" ")[1];

        req.decodedToken = verifyToken(token);
    } catch (err) {
        return next(err); // pass the error to the next error-handling middleware (not Reqular middleware(The controller))
    }
    next(); // Continue to the next middleware (Reqular Middleware)
};
