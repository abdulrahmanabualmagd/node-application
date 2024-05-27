"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Users", {
            id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true,
                allowNull: false,
            },
            username: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true,
                validate: {
                    notEmpty: true,
                },
            },
            email: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true,
                validate: {
                    isEmail: true,
                    notEmpty: true,
                },
            },
            passwordHash: {
                type: Sequelize.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true,
                },
            },
            firstName: {
                type: Sequelize.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true,
                    min: 3,
                    max: 15,
                },
            },
            lastName: {
                type: Sequelize.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true,
                    min: 3,
                    max: 15,
                },
            },
            phone: {
                type: Sequelize.STRING,
                allowNull: true,
                validate: {
                    is: /^[0-9]+$/i,
                },
            },
            address: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            lastLogin: {
                type: Sequelize.DATE,
                allowNull: true,
            },
            status: {
                type: Sequelize.STRING,
                allowNull: false,
                defaultValue: "active",
                validate: {
                    isIn: [["active", "inactive", "suspend"]],
                },
            },
            salt: {
                type: Sequelize.STRING,
                allowNull: false,
                defaultValue: "",
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
        await queryInterface.dropTable("Users");
    },
};
