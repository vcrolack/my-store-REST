const joi = require('joi');

const id = joi.string().uuid();
const firstName = joi.string().min(3).max(15);
const lastName = joi.string().min(3).max(15);
const jobTitle = joi.string().min(3).max(15);

const createUserSchema = joi.object({
  firstName: firstName.required(),
  lastName: lastName.required(),
  jobTitle: jobTitle.required(),
});

const updadatedUserSchema = joi.object({
  firstName,
  lastName,
  jobTitle,
});

const getUserSchema = joi.object({
  id: id.required(),
});

module.exports = { createUserSchema, updadatedUserSchema, getUserSchema };
