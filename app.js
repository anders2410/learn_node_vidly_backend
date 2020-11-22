require("dotenv").config({ path: __dirname + "/.env" });
const express = require("express");
const path = require("path");
const app = express();

require("./startup/logging")();
require("./startup/routes")(app);
require("./startup/db")();
require("./startup/validation")();
require("./startup/prod")(app);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

module.exports = app;
