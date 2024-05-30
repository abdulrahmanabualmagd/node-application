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
                    model: "Roles",
                    key: "id",
                },
            },
            permissionId: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: "Permissions",
                    key: "id",
                },
            },
        },
        {
            sequelize,
            modelName: "RolePermissions",
            primaryKey: ["roleId", "permissionId"],
        }
    );

    return RolePermission;
};
