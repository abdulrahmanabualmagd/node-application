const express = require("express");
const db = require("./models/identity/index");
const logger = require("./log/logger");
const fileUpload = require("express-fileupload");

const { notFoundHandler } = require("./middlewares/notFoundHandler");
const { errorHandler } = require("./middlewares/errorHandler");
const app = express();

// Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.text());
app.use(express.raw());
app.use(fileUpload());

// Routes
app.use("/auth", require("./routers/authRouters"));
app.use("/home", require("./routers/homeRouters"));


// Handlers
app.all("*", notFoundHandler);
app.use(errorHandler);

app.listen(process.env.PORT, () => {
    console.log(`http://localhost:${process.env.PORT}`);
});
