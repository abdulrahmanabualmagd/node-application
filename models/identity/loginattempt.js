"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class LoginAttempt extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    LoginAttempt.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValud: DataTypes.UUIDV4,
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
