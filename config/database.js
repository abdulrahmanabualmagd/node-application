require("dotenv").config();

// Get the env variable to know which datbase you want to use
const identityPath = `../models/${process.env.IDENTITY_DATABASE}/identity/index`;
const applicationPath = `../models/${process.env.APPLICATION_DATABASE}/application/index`;

// Choose the Identity Database (sql, mongodb)
const dbIdentity = require(identityPath)();
// Choose the Application Database (sql, mongodb)
const dbApplication = require(applicationPath)();

module.exports = {
    dbIdentity,
    dbApplication,
};
