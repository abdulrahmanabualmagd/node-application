"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes, uuidv4) => {
    class Role extends Model {

        static associate(models) {
            // User (we include the ref 'roleId' in the junction table [ManyToMany])
            Role.belongsToMany(models.User, {
                as: "users",
                through: "UserRole",        // The Model name of the junction table (not the name of the created table)
                foreignKey: "roleId",
                otherKey: "userId",         // (optional)
            });

            // Permissions (we include the ref 'roleId' in the junction table [ManyToMany])
            Role.belongsToMany(models.Permission, {
                as: "permissions",
                through: "RolePermission",  // The model name of the junction table (not the name of the created tables)   
                foreignKey: "roleId",
                otherKey: "permissionId",   // (optional)
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
