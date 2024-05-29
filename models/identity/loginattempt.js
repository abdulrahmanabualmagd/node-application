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
            timestamp: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            ipAddress: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            userAgent: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            successful: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: "LoginAttempt",
        }
    );
    return LoginAttempt;
};
