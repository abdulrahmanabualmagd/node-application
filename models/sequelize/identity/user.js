"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes, uuidv4) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // Role
            User.belongsToMany(models.Role, {
                as: "roles",
                through: "UserRole",
                foreignKey: "userId",
                otherKey: "roleId",
            });

            // AuthProviders
            User.hasMany(models.AuthenticationProvider, {
                as: "authProviders",
                foreignKey: "userId",
            });

            // ResetTokens
            User.hasMany(models.PasswordResetToken, {
                as: "resetTokens",
                foreignKey: "userId",
            });

            // Login Attempt
            User.hasMany(models.LoginAttempt, {
                as: "loginAttempts",
                foreignKey: "userId",
            });

            // VerifyTokens
            User.hasMany(models.EmailVerificationToken, {
                as: "verifyTokens",
                foreignKey: "userId",
            });
        }
    }
    User.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: uuidv4(),
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
            modelName: "User", // this name can be used as a ref to this model ( in the application )
            tableName: "users",
        }
    );
    return User;
};
