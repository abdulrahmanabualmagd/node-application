"use strict";
const { v4 : uuidv4 } = require("uuid");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert("Roles", [
            {
                id: uuidv4(),
                name: "admin",
                description: "Admin role", // Example of setting a description
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: uuidv4(),
                name: "user",
                description: "User role", // Example of setting a description
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("Roles", null, {});
    },
};
