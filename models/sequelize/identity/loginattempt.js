"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes, uuidv4) => {
    class LoginAttempt extends Model {
        static associate(models) {
            // User (this is enough we don't have to add the 'userId' attribute in the initialization)
            LoginAttempt.belongsTo(models.User, {
                as: "user",
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
            tableName: "login_attempts",
        }
    );
    return LoginAttempt;
};
