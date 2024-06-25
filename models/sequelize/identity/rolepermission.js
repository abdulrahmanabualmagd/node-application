"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class RolePermission extends Model {
        static associate(models) {
            // In junction tables there are no association definitions to define
        }
    }
    RolePermission.init(
        {
            roleId: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: "Role", // The name of the model itself (not the name of the created table)
                    key: "id",
                },
            },
            permissionId: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: "Permission", // the name of the model itself (not the name of the created table)
                    key: "id",
                },
            },
        },
        {
            sequelize,
            modelName: "RolePermission",
            primaryKey: ["roleId", "permissionId"], // Composite primary key
            tableName: "roles_permissions",
        }
    );

    return RolePermission;
};
