"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes, uuidv4) => {
    class LoginAttempt extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // User
            LoginAttempt.belongsTo(models.User, {
                as: "User",
                foreignKey: "userId",
            });
        }
    }
    LoginAttempt.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: uuidv4(),
                primaryKey: true,
                allowNull: false,
            },
            ipAddress: {
                type: DataTypes.STRING,
                allowNull: true,
                validate: {
                    notEmpty: true,
                },
            },
            userAgent: {
                type: DataTypes.STRING,
                allowNull: true,
                validate: {
                    notEmpty: true,
                },
            },
            successful: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                validate: {
                    notEmpty: true,
                },
            },
        },
        {
            sequelize,
            modelName: "LoginAttempt",
        }
    );
    return LoginAttempt;
};
