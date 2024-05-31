const { where } = require("sequelize");
const db = require("../models/identity/index");
const { hashPassword, verifyPassword } = require("../utils/passwordUtils");
const { createToken, verifyToken } = require("../utils/tokenUtils");

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


