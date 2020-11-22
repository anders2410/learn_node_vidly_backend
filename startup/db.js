const mongoose = require("mongoose");
const winston = require("winston");

const dbUrl =
  "mongodb+srv://andersholt:1234@vidly.rj4zg.mongodb.net/data?retryWrites=true&w=majority";

module.exports = function () {
  mongoose
    .connect(dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => winston.info("Connected to MongoDB"));
};
