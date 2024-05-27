"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class AuthenticationProvider extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    AuthenticationProvider.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValud: DataTypes.UUIDV4,
                primaryKey: true,
                allowNull: false,
            },
            providerName: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: false,
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
                allowNull: true,
            },
        },
        {
            sequelize,
            modelName: "AuthenticationProvider",
        }
    );
    return AuthenticationProvider;
};
