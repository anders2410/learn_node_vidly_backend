require("express-async-errors");

const winston = require("winston");

module.exports = function () {
  process.on("uncaughtException", (ex) => {
    winston.error(ex.message);
    process.exit(1);
  });

  process.on("unhandledRejection", (ex) => {
    winston.error(ex.message);
    process.exit(1);
  });

  winston.add(
    new winston.transports.Console({
      colorize: true,
      prettyPrint: true,
      format: winston.format.simple(),
    })
  );
};
