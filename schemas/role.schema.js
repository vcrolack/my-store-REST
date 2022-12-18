const joi = require('joi');

const id = joi.number().integer();
const name = joi.string();

const createRoleSchema = joi.object({
  name: name.required(),
});

const updatedRoleSchema = joi.object({
  name: name.required(),
});

const getRoleSchema = joi.object({
  id: id.required(),
});

module.exports = {
  createRoleSchema,
  updatedRoleSchema,
  getRoleSchema,
};
