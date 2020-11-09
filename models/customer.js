const mongoose = require("mongoose");
const Joi = require("joi");

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 50,
  },
  isGold: {
    type: Boolean,
    default: false,
  },
  phone: {
    type: String,
    required: true,
    minLength: 8,
    maxLength: 8,
  },
});

const Customer = mongoose.model("customers", customerSchema);

// Validating the Customer
function validateCustomer(customer) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    phone: Joi.string().min(8).max(8).required(),
    isGold: Joi.boolean()
  });

  return schema.validate(customer);
}

exports.Customer = Customer;
exports.validate = validateCustomer;
