const joi = require('joi');

const id = joi.number().integer();
const name = joi.string().min(3).max(15);

const createCategorySchema = joi.object({
  name: name.required(),
});

const updatedCategorySchema = joi.object({
  name: name,
});

const getCategorySchema = joi.object({
  id: id.required(),
});

module.exports = {
  createCategorySchema,
  updatedCategorySchema,
  getCategorySchema,
};
