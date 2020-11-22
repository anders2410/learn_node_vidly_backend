require("dotenv").config({ path: __dirname + "/.env" });
const express = require("express");
const path = require("path");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(function (req, res, next) {
  res.setHeader(
    "Content-Security-Policy",
    "script-src 'self' https://apis.google.com"
  );
  return next();
});
app.use(express.static(path.join(__dirname, "public")));

require("./startup/logging")();
require("./startup/routes")(app);
require("./startup/db")();
require("./startup/validation")();
require("./startup/prod")(app);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

module.exports = app;
