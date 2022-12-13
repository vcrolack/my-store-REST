const joi = require('joi');

const id = joi.number().integer();
const products = joi.array().items(joi.string);
const document = joi.string().alphanum();
const clientId = joi.number().integer();
const total = joi.number().integer().positive();

const createOrderSchema = joi.object({
  products: products.required(),
  document: document.required(),
  clientId: clientId.required(),
  total: total.required(),
});

const updatedOrderSchema = joi.object({
  products: products.required(),
});

const getOrderSchema = joi.object({
  id: id.required(),
});

module.exports = {
  createOrderSchema,
  updatedOrderSchema,
  getOrderSchema,
};
