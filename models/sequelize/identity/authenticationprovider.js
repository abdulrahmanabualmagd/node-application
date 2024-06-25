"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes, uuidv4) => {
    class AuthenticationProvider extends Model {
        static associate(models) {
            // User (this is enough we don't have to add the 'userId' attribute in the initialization)
            AuthenticationProvider.belongsTo(models.User, {
                as: "user",
                foreignKey: "userId",
            });
        }
    }
    AuthenticationProvider.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: uuidv4(),
                primaryKey: true,
                allowNull: false,
            },
            providerName: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true,
                },
            },
            providerUserID: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true,
                },
            },
            accessToken: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true,
                },
            },
        },
        {
            sequelize,
            modelName: "AuthenticationProvider",
            tableName: "authentication_providers",
        }
    );
    return AuthenticationProvider;
};
