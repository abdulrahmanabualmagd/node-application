"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes, uuidv4) => {
    class PasswordResetToken extends Model {
        static associate(models) {
            // User (this is enough we don't have to add the 'userId' attribute in the initialization)
            PasswordResetToken.belongsTo(models.User, {
                as: "user",
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
                unique: true,
                validate: {
                    notEmpty: true,
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
            expiresAt: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: new Date(Date.now() + 1000 * 60 * 30), // 30 Minutes
            },
        },
        {
            sequelize,
            modelName: "PasswordResetToken",
            tableName: "password_reset_tokens",
        }
    );
    return PasswordResetToken;
};
