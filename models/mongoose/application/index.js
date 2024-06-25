const mongoose = require("mongoose");
require("dotenv").config();
const fs = require("fs").promises; // Use the promises version of fs
const path = require("path");
const basename = path.basename(__filename);
const Repository = require("./../../../repository/mongoose/mongoose-repo.js");

let db = null;

// Mongoose Connection
module.exports = async () => {
    // Singleton
    if (db) return db;

    db = {};

    try {
        await mongoose.connect(process.env.DB_MONGOOSE_URL, { dbName: process.env.DB_APP_NAME });
        console.log("# Mongoose Database Connected! #");

        // Importing Mongoose Models
        const files = await fs.readdir(__dirname);
        const modelPromises = files
            .filter((file) => {
                return (
                    file.indexOf(".") !== 0 && // Avoid hidden files
                    file !== basename && // Exclude current file
                    path.extname(file) === ".js" && // Check for .js extension
                    file.indexOf(".test.js") === -1 // Exclude test files
                );
            })
            .map(async (file) => {
                const model = require(path.join(__dirname, file))(mongoose);
                db[model.modelName] = model; // In mongoose => [model.modelName] | In sequelize => [model.name]
                db[model.modelName].repo = new Repository(model); // Repository
            });

        await Promise.all(modelPromises);
    } catch (err) {
        console.log(err.message);
    }

    db.mongoose = mongoose;
    return db;
};
