const joi = require('joi');

const id = joi.number().integer();
const firstName = joi.string().min(3).max(15);
const lastName = joi.string().min(3).max(15);
const address = joi.string().min(3).max(60);
const email = joi.string().email();
const password = joi.string().min(5).max(20);
const phone = joi.string().min(9).max(9);

const createClientSchema = joi.object({
  firstName: firstName.required(),
  lastName: lastName.required(),
  address: address.required(),
  email: email.required(),
  password: password.required(),
  phone: phone.required(),
});

const updatedClientSchema = joi.object({
  firstName,
  lastName,
  address,
  password,
  phone,
});

const getClientSchema = joi.object({
  id: id.required(),
});

module.exports = { createClientSchema, updatedClientSchema, getClientSchema };
