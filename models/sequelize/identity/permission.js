"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes, uuidv4) => {
    class Permission extends Model {
        static associate(models) {
            Permission.belongsToMany(models.Role, {
                as: "roles",
                through: "RolePermission",
                foreignKey: "permissionId",
                otherKey: "roleId",
            });
        }
    }
    Permission.init(
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
            modelName: "Permission",
            tableName: "permissions",
        }
    );
    return Permission;
};
