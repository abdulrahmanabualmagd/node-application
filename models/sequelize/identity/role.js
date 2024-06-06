"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes, uuidv4) => {
    class Role extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // User
            Role.belongsToMany(models.User, {
                as: "users",
                through: "UserRole",
                foreignKey: "roleId",
                otherKey: "userId",
            });

            // Permissions
            Role.belongsToMany(models.Permission, {
                through: "RolePermission",
                as: "permissions",
                foreignKey: "roleId",
                otherKey: "permissionId",
            });
        }
    }
    Role.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: uuidv4(),
                primaryKey: true,
                allowNull: false,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true,
                },
            },
            description: {
                type: DataTypes.STRING,
                allowNull: true,
            },
        },
        {
            sequelize,
            modelName: "Role",
            tableName: "roles",
        }
    );
    return Role;
};
