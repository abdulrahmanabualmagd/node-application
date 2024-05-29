"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes, uuidv4) => {
    class EmailVerificationToken extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // User
            EmailVerificationToken.belongsTo(models.User, {
                as: "User",
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
                    notEmpty: false,
                },
            },
            expiresAt: {
                type: DataTypes.DATE,
            },
        },
        {
            sequelize,
            modelName: "EmailVerificationToken",
        }
    );
    return EmailVerificationToken;
};
