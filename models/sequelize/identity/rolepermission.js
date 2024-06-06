"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class RolePermission extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    RolePermission.init(
        {
            roleId: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: "Role",
                    key: "id",
                },
            },
            permissionId: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: "Permission",
                    key: "id",
                },
            },
        },
        {
            sequelize,
            modelName: "RolePermission",
            primaryKey: ["roleId", "permissionId"],
            tableName: "roles_permissions",
        }
    );

    return RolePermission;
};
