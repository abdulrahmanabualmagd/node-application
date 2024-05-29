"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes, uuidv4) => {
    class PasswordResetToken extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // User
            PasswordResetToken.belongsTo(models.User, {
                as: "User",
                foreignKey: "userId",
            });
        }
    }
    PasswordResetToken.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: uuidv4(),
                primaryKey: true,
                allowNull: false,
            },
            token: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: false,
                },
            },
            ipAddress: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            userAgent: {
                type: DataTypes.STRING,
                allowNull: true,
            },
        },
        {
            sequelize,
            modelName: "PasswordResetToken",
        }
    );
    return PasswordResetToken;
};
