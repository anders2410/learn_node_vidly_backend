const { Customer, validate } = require("../models/Customer");
const express = require("express");
const router = express.Router();

// HTTP-GET: Get all the genres
router.get("/", async (req, res) => {
  const customers = await Customer.find().sort("name");
  res.send(customers);
});

// HTTP-POST: Posts a genre to the server
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(404).send("The genre with the given ID was not found.");
  }

  const customer = new Customer();
  customer.name = req.body.name;
  customer.phone = req.body.phone;
  customer.isGold = req.body.isGold;

  customer.save((err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.send("Data inserted");
    }
  });
});

module.exports = router;
