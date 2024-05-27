"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("RolePermissions", {
            roleId: {
                type: Sequelize.UUID,
                primaryKey: true,
                references: {
                    model: "Roles",
                    key: "id",
                },
                onDelete: "CASCADE",
                onUpdate: "CASCADE",
            },
            permissionId: {
                type: Sequelize.UUID,
                primaryKey: true,
                references: {
                    model: "Permissions",
                    key: "id",
                },
                onDelete: "CASCADE",
                onUpdate: "CASCADE",
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("RolePermissions");
    },
};
