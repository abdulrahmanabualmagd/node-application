const db = require("../models/identity/index");
const { hashPassword, verifyPassword } = require("../utils/passwordUtils");
const { createToken } = require("../utils/tokenUtils");
const { passwordResetToken, checkRecentToken, checkExpiration } = require("../utils/passwordResetUtils");

// ------------------------------- [ Register ] -------------------------------
exports.registerService = async (req, res, next) => {
    // Collect Data
    const { username, email, password, firstName, lastName, phone, address } = req.body;

    // Check Data
    if (!username || !email || !password || !firstName || !lastName) throw new Error("Missing Required Fields");

    try {
        // Check email duplication
        const emailduplicationResult = await db.User.repo.find({ where: { email: email } });
        if (emailduplicationResult) throw new Error("Dublicated Email");

        // Hash Password
        const { hashedPassword, salt } = await hashPassword(password);

        // Create User
        const userData = {
            username: username,
            email: email,
            passwordHash: hashedPassword,
            firstName: firstName,
            lastName: lastName,
            phone: phone || null,
            address: address || null,
            status: "active",
            salt,
        };

        // Insert User to Database
        const user = await db.User.repo.create(userData);

        // Get User Role
        const role = await db.Role.repo.find({ where: { name: "user" } });

        // Add Role to User
        await user.addRole(role);

        // Return User
        return user;
    } catch (err) {
        throw err;
    }
};

// ------------------------------- [ Login ] -------------------------------
exports.loginService = async (req, res, next) => {
    // Collect Data
    const { email, password } = req.body;

    // Check Data
    if (!email || !password) throw new Error("Missing required fields");

    try {
        // Get User by Email
        const user = await db.User.repo.find({
            where: { email: email },
            include: [
                {
                    model: db.Role,
                    as: "Roles",
                },
            ],
        });
        if (!user) throw new Error("User Not Found");

        // Hash Password
        if (!(await verifyPassword(password, user.salt, user.passwordHash))) throw new Error("Wrong Password");

        // Prepare All Roles Names
        const roles = [];
        if (user.Roles.length > 0) {
            for (let item of user.Roles) {
                roles.push(item.name);
            }
        }

        // Prepare Payload
        const payload = {
            username: user.username,
            email: user.email,
            phone: user.phone,
            address: user.address,
            roles: roles,
        };

        // Create Token
        const token = createToken(payload);

        return token;
    } catch (err) {
        throw err;
    }
};

// ------------------------------- [ Rest Password ] -------------------------------
exports.resetPasswordGetTokenService = async (req, res, next) => {
    // Collect Data
    const { email } = req.body;

    if (!email) throw new Error("Missing required Field");

    try {
        // Get user
        const user = await db.User.repo.find({ where: { email: email } });

        // Check if user exists
        if (!user) throw new Error("Email Not Found");

        // Get user's reset tokens (if it exist, get the most recent to check for timeout)
        const userRecentPasswordResetToken = await db.PasswordResetToken.repo.find({
            where: {
                userId: user.id,
            },
            order: [["createdAt", "DESC"]],
        });

        // Check reset token
        if (userRecentPasswordResetToken) {
            // Check availability to create another one if it has passed the specified time
            const result = checkRecentToken(userRecentPasswordResetToken.createdAt);
            if (result > 0)
                throw new Error(`You have to wait ${result / (60 * 1000)} minutes before Generating another token`);
        }

        // Create String Token object
        const passwordResetTokenObject = {
            token: passwordResetToken(), // Default Bytes[64]
            userId: user.id,
            expiresAt: new Date(Date.now() + 1000 * 60 * process.env.RESET_PASSWORD_EXPIRATION),
        };

        // Store the token in database
        db.PasswordResetToken.repo.create(passwordResetTokenObject);

        return passwordResetTokenObject.token;
    } catch (err) {
        throw err;
    }
};

exports.resetPasswordVerifyTokenService = async (req, res, next) => {
    // Collect Data
    const { token } = req.params;
    const { password } = req.body;

    // Check Data
    if (!token || !password) throw new Error("Token or Password not found");

    // Get Token
    const userToken = await db.PasswordResetToken.repo.find({
        where: { token: token },
        order: [["createdAt", "DESC"]],
        include: {
            model: db.User,
            as: "User",
        },
    });

    // Check Existance Token
    if (!userToken) throw new Error("Token Not Found");

    // Check Token Expiration
    if (checkExpiration(userToken.expiresAt)) throw new Error("Token Expired");

    // Hash Password
    const { hashedPassword, salt } = await hashPassword(password);

    // Update User Password, Salt, UpdatedAt
    userToken.User.passwordHash = hashedPassword;
    userToken.User.salt = salt;
    userToken.User.updatedAt = Date.now();

    // Save Updated Valued for User
    await userToken.User.save();

    // Destroy Used Token
    userToken.destroy();

    return "Password Updated Successfully!";

    try {
    } catch (err) {
        throw err;
    }
};
