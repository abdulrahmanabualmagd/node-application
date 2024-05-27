"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
           
        }
    }
    User.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValud: DataTypes.UUIDV4,
                primaryKey: true,
                allowNull: false,
            },
            username: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                validate: {
                    notEmpty: true,
                },
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                validate: {
                    isEmail: true,
                    notEmpty: true,
                },
            },
            passwordHash: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true,
                },
            },
            firstName: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true,
                },
            },
            lastName: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true,
                },
            },
            phone: {
                type: DataTypes.STRING,
                allowNull: true,
                validate: {
                    is: /^[0-9]+$/i,
                },
            },
            address: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            lastLogin: {
                type: DataTypes.DATE,
                allowNull: true,
            },
            status: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: "active",
                validate: {
                    isIn: [["active", "inactive", "suspend"]],
                },
            },
            salt: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: "",
            },
        },
        {
            sequelize,
            modelName: "User",
        }
    );
    return User;
};
