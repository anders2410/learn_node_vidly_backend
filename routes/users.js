// Used to hash passwords
const bcrypt = require("bcrypt");
// Library with utilities for objects
const _ = require("lodash");
const { User, validate } = require("../models/user");
const express = require("express");
const router = express.Router();

// HTTP-GET: Get all the users
router.get("/", async (req, res) => {
  const users = await User.find();
  res.send(users);
});

// HTTP-POST: Posts a user to the server
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(404).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(404).send("User already exists");

  user = new User(_.pick(req.body, ["name", "email", "password"]));
  const salt = await bcrypt.genSalt();
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  res.send(_.pick(user, ["_id", "name", "email"]));
});

module.exports = router;
