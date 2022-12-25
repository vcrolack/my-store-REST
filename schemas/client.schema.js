const joi = require('joi');

const id = joi.number().integer();
const userId = joi.number().integer();
const firstName = joi.string().min(3).max(15);
const lastName = joi.string().min(3).max(15);
const address = joi.string().min(3).max(60);
const phone = joi.string().min(9).max(9);
const email = joi.string().email();
const password = joi.string().min(5).max(30);
const roleId = joi.number().integer().positive();

const createClientSchema = joi.object({
  firstName: firstName.required(),
  lastName: lastName.required(),
  address: address.required(),
  phone: phone.required(),
  user: joi.object({
    firstName: firstName.required(),
    lastName: lastName.required(),
    email: email.required(),
    password: password.required(),
    roleId: roleId.required()
  })
});

const updatedClientSchema = joi.object({
  firstName,
  lastName,
  address,
  phone,
  userId,
});

const getClientSchema = joi.object({
  id: id.required(),
});

module.exports = { createClientSchema, updatedClientSchema, getClientSchema };
