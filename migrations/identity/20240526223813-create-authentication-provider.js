"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("AuthenticationProviders", {
            id: {
                type: Sequelize.UUID,
                defaultValud: Sequelize.UUIDV4,
                primaryKey: true,
                allowNull: false,
            },
            providerName: {
                type: Sequelize.STRING,
                allowNull: false,
                validate: {
                    notEmpty: false,
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
        await queryInterface.dropTable("AuthenticationProviders");
    },
};
