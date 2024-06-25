"use strict";

const { v4: uuidv4 } = require("uuid");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("email_verification_tokens", {
            id: {
                type: Sequelize.UUID,
                defaultValue: uuidv4(),
                primaryKey: true,
                allowNull: false,
            },
            token: {
                type: Sequelize.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true,
                },
            },
            expiresAt: {
                type: Sequelize.DATE,
                allowNull: false,
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
                    model: "users",     // the name of the created table not the model name with capital letter
                    key: "id",
                },
                onDelete: "CASCADE",
                onUpdate: "CASCADE",
            },
        });
    },
    async down(queryInterface, Sequelize, uuidv4) {
        await queryInterface.dropTable("email_verification_tokens");
    },
};
