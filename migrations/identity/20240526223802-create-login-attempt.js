"use strict";

const { v4: uuidv4 } = require("uuid");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("login_attempts", {
            id: {
                type: Sequelize.UUID,
                defaultValue: uuidv4(),
                primaryKey: true,
                allowNull: false,
            },
            ipAddress: {
                type: Sequelize.STRING,
                allowNull: true,
                validate: {
                    notEmpty: true,
                },
            },
            userAgent: {
                type: Sequelize.STRING,
                allowNull: true,
                validate: {
                    notEmpty: true,
                },
            },
            successful: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                validate: {
                    notEmpty: true,
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
        await queryInterface.dropTable("login_attempts");
    },
};
