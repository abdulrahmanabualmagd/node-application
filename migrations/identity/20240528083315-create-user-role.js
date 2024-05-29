"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("UserRoles", {
            userId: {
                type: Sequelize.UUID,
                allowNull: false,
                primaryKey: true,
                references: {
                    model: "Users",
                    key: "id",
                },
            },
            roleId: {
                type: Sequelize.UUID,
                allowNull: false,
                primaryKey: true,
                references: {
                    model: "Roles",
                    key: "id",
                },
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
        await queryInterface.dropTable("UserRoles");
    },
};
