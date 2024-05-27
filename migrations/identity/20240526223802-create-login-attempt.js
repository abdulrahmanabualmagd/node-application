"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("LoginAttempts", {
            id: {
                type: Sequelize.UUID,
                defaultValud: Sequelize.UUIDV4,
                primaryKey: true,
                allowNull: false,
            },
            timestamp: {
                type: Sequelize.DATE,
                allowNull: false,

            },
            ipAddress: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            userAgent: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            successful: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("LoginAttempts");
    },
};
