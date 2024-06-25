"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes, uuidv4) => {
    class EmailVerificationToken extends Model {
        static associate(models) {
            // User (this is enough we don't have to add the 'userId' attribute in the initialization)
            EmailVerificationToken.belongsTo(models.User, {
                as: "user",
                foreignKey: "userId",
            });
        }
    }
    EmailVerificationToken.init(
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
                    notEmpty: true,
                },
            },
            expiresAt: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: new Date(Date.now() + 1000 * 60 * 30), // 30 Minutes
            },
        },
        {
            sequelize,
            modelName: "EmailVerificationToken",
            tableName: "email_verification_tokens",
        }
    );
    return EmailVerificationToken;
};
