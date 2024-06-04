"use strict";

const { v4: uuidv4 } = require("uuid");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("AuthenticationProviders", {
            id: {
                type: Sequelize.UUID,
                defaultValue: uuidv4(),
                primaryKey: true,
                allowNull: false,
            },
            providerName: {
                type: Sequelize.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true,
                },
            },
            providerUserID: {
                type: Sequelize.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true,
                },
            },
            accessToken: {
                type: Sequelize.STRING,
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
                    model: "Users",
                    key: "id",
                },
                onDelete: "CASCADE",
                onUpdate: "CASCADE",
            },
        });
    },
    async down(queryInterface, Sequelize, uuidv4) {
        await queryInterface.dropTable("AuthenticationProviders");
    },
};
