const mongoose = require("mongoose");
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const indexRouter = require("./routes/index");
const customersRouter = require("./routes/customers");
const genresRouter = require("./routes/genres");
const rentalsRouter = require("./routes/rentals");
const usersRouter = require("./routes/users");
const authRouter = require("./routes/auth");

mongoose
  .connect(
    "mongodb+srv://andersholt:1234@vidly.rj4zg.mongodb.net/data?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch(() => console.error("Error connecting to MongoDB"));

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/api/customers", customersRouter);
app.use("/api/genres", genresRouter);
app.use("/api/rentals", rentalsRouter);
app.use("/api/users", usersRouter);
app.use("/api/auth", authRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
