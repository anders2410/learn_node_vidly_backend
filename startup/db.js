const mongoose = require("mongoose");
const winston = require("winston");

const dbUrl = process.env["DATABASE_NAME"];

module.exports = function () {
  mongoose
    .connect(dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => winston.info("Connected to MongoDB"));
};
