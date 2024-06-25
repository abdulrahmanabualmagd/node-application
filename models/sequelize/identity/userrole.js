"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class UserRole extends Model {
        static associate(models) {
            // In junction tables there are no association definitions to define
        }
    }
    UserRole.init(
        {
            userId: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: "User",      // The name of the model itself (not the created table)
                    key: "id",
                },
            },
            roleId: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: "Role",      // The name of the model itself (not the created table)
                    key: "id",
                },
            },
        },
        {
            sequelize,
            modelName: "UserRole",
            primaryKey: ["userId", "roleId"],   // Composite primary key
            tableName: "users_roles",
        }
    );
    return UserRole;
};
