const bcrypt = require("bcrypt");
require("dotenv").config();

// Returns Obj (hashedPass & saltValue)
exports.hashPassword = async (password) => {
    try {
        salt = await bcrypt.genSalt(Number(process.env.BCRYPT_SALT_ROUNDS));
        const hashedPassword = await bcrypt.hash(password, salt);

        return {
            hashedPassword: hashedPassword,
            salt: salt,
        };
        
    } catch (err) {
        throw err;
    }
};

// Returns boolean value
exports.verifyPassword = async (enteredPass, salt, storedHashedPass) => {
    try {
        const hashedEnteredPassword = await bcrypt.hash(enteredPass, salt);
        return hashedEnteredPassword === storedHashedPass;
    } catch (err) {
        throw err;
    }
};
