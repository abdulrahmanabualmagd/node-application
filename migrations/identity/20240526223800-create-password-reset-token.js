"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("PasswordResetTokens", {
            id: {
                type: Sequelize.UUID,
                defaultValud: Sequelize.UUIDV4,
                primaryKey: true,
                allowNull: false,
            },
            token: {
                type: Sequelize.STRING,
                allowNull: false,
                validate: {
                    notEmpty: false,
                },
            },
            ipAddress: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            userAgent: {
                type: Sequelize.STRING,
                allowNull: true,
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
        await queryInterface.dropTable("PasswordResetTokens");
    },
};
