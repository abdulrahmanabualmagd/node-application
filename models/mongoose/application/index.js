const mongoose = require("mongoose");
require("dotenv").config();
const fs = require("fs");
const path = require("path");
const basename = path.basename(__filename);
const Repository = require("../../../repository/mongoose/mongoose-repo");

// Mongoose Connection
module.exports = async () => {
    db = {};
    try {
        await mongoose.connect(process.env.DB_MONGOOSE_URL);
        console.log("#Database Connected!#");

        // Importing Mongoose Models
        fs.readdirSync(__dirname)
            .filter((file) => {
                return (
                    file.indexOf(".") !== 0 && // Avoid hidden files
                    file !== basename && // Exclude current file
                    path.extname(file) === ".js" && // Check for .js extension or we can use [file.slice(-3) === ".js" &&]
                    file.indexOf(".test.js") === -1 // Exclude test files
                );
            })
            .forEach((file) => {
                const model = require(path.join(__dirname, file))(mongoose);
                db[model.modelName] = model; // In mongoose => [model.modelName] | In sequelize => [model.name]
                db[model.name].repo = new Repository(model); // Repository
            });
    } catch (err) {
        console.log(err.message);
    }

    db.mongoose = mongoose;
    db.dbConnect = dbConnect;

    return db;
};
