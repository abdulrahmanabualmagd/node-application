"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("role_permissions", {
            roleId: {
                type: Sequelize.UUID,
                primaryKey: true,
                references: {
                    model: "roles",         // the name of the created table not the model name with capital letter
                    key: "id",
                },
                onDelete: "CASCADE",
                onUpdate: "CASCADE",
            },
            permissionId: {
                type: Sequelize.UUID,
                primaryKey: true,
                references: {
                    model: "permissions",   // the name of the created table not the model name with capital letter
                    key: "id",
                },
                onDelete: "CASCADE",
                onUpdate: "CASCADE",
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.NOW,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.NOW,
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("role_permissions");
    },
};
