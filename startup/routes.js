const express = require("express");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const error = require("../middleware/error");

const indexRouter = require("../routes/index");
const customersRouter = require("../routes/customers");
const genresRouter = require("../routes/genres");
const rentalsRouter = require("../routes/rentals");
const usersRouter = require("../routes/users");
const authRouter = require("../routes/auth");

module.exports = function (app) {
  app.use(logger("dev"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  // app.use(express.static(path.join(__dirname, "public")));

  app.use("/", indexRouter);
  app.use("/api/customers", customersRouter);
  app.use("/api/genres", genresRouter);
  app.use("/api/rentals", rentalsRouter);
  app.use("/api/users", usersRouter);
  app.use("/api/auth", authRouter);

  // error handler
  app.use(error);
};
