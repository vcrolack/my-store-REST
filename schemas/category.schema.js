const joi = require('joi');

const id = joi.string().uuid();
const name = joi.string().min(3).min(15);

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
