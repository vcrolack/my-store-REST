const joi = require('joi');

const id = joi.number().integer();
const name = joi.string().min(3).max(15);
const price = joi.number().integer().min(10);
const image = joi.string().uri();
const description = joi.string().min(10).max(100);
const categoryId = joi.number().integer();
const limit = joi.number().integer();
const offset = joi.number().integer();

const createProductSchema = joi.object({
  name: name.required(),
  price: price.required(),
  image: image.required(),
  description: description.required(),
  categoryId: categoryId.required(),
});

const updatedProductSchema = joi.object({
  name,
  price,
  image,
  description,
  categoryId,
});

const getProductSchema = joi.object({
  id: id.required(),
});

const queryProductSchema = joi.object({
  limit,
  offset,
});

module.exports = {
  createProductSchema,
  updatedProductSchema,
  getProductSchema,
  queryProductSchema,
};
