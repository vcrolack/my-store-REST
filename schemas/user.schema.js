const joi = require('joi');

const id = joi.number().integer().positive();
const firstName = joi.string().min(3).max(15);
const lastName = joi.string().min(3).max(15);
const email = joi.string();
const password = joi.string().min(5).max(30);
const roleId = joi.number().integer().positive();

const createUserSchema = joi.object({
  firstName: firstName.required(),
  lastName: lastName.required(),
  email: email.required(),
  password: password.required(),
  roleId: roleId.required(),
});

const updatedUserSchema = joi.object({
  firstName,
  lastName,
  email,
  password,
  roleId,
});

const getUserSchema = joi.object({
  id: id.required(),
});

module.exports = { createUserSchema, updatedUserSchema, getUserSchema };
