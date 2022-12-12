const joi = require('joi');

const id = joi.number().integer();
const category_id = joi.number().integer();
const name = joi.string.min(3).max(15);

const createSubcategorySchema = joi.object({
  name: name.required(),
  category_id: category_id.required(),
});

const updateSubcategorySchema = joi.object({
  name: name,
  category_id: category_id,
});

const getSubcategorySchema = joi.object({
  id: id.required(),
});

module.exports = {
  createSubcategorySchema,
  updateSubcategorySchema,
  getSubcategorySchema,
};
