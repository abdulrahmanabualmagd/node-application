const mailer = require("nodemailer");
const fs = require("fs").promises;
const path = require("path");
require("dotenv").config();

// Create Transporter
const transporter = mailer.createTransport({
    service: process.env.MAILER_SERVICE,
    host: process.env.MAILER_HOST,
    port: process.env.MAILER_PORT,
    secure: process.env.MAILER_SECURE, // Use `true` for port 465, `false` for all other ports
    auth: {
        user: process.env.MAILER_AUTH_USER,
        pass: process.env.MAILER_AUTH_PASS,
    },
});

exports.passwordResetMail = async (email, token) => {
    // Get password reset email body
    const templatePath = path.join(__dirname, "../views/resetPasswordEmailbody.html");
    const template = await fs.readFile(templatePath, "utf-8");

    const info = await transporter.sendMail({
        from: `${process.env.MAILER_SENDER_NAME} <${process.env.MAILER_AUTH_USER}>`,
        to: email,
        subject: "User Reset Password ♻",
        html: template,
    });

    console.log(info);
};
