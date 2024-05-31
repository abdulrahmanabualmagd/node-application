"use strict";

const { v4: uuidv4 } = require("uuid");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("PasswordResetTokens", {
            id: {
                type: Sequelize.UUID,
                defaultValue: uuidv4(),
                primaryKey: true,
                allowNull: false,
            },
            token: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true,
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
            expiresAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal("DATEADD(minute, 30, GETDATE())"), // This works for (MS SQL Server)
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
            userId: {
                type: Sequelize.UUID,
                references: {
                    model: "Users",
                    key: "id",
                },
                onDelete: "CASCADE",
                onUpdate: "CASCADE",
            },
        });
    },
    async down(queryInterface, Sequelize, uuidv4) {
        await queryInterface.dropTable("PasswordResetTokens");
    },
};
