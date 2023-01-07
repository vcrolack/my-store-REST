const joi = require('joi');

const id = joi.number().integer();
const products = joi.array().items(joi.number());
const document = joi.string().alphanum();
const clientId = joi.number().integer();
const state = joi.string();
const orderId = joi.number().integer();
const productId = joi.number().integer();
const amount = joi.number().integer().min(1);

const createOrderSchema = joi.object({
  products: products.required(),
  document: document.required(),
  clientId: clientId.required(),
  state: state.required(),
});

const updatedOrderSchema = joi.object({
  products,
  state,
});

const getOrderSchema = joi.object({
  id: id.required(),
});

const addItemSchema = joi.object({
  orderId: orderId.required(),
  productId: productId.required(),
  amount: amount.required(),
});

module.exports = {
  createOrderSchema,
  updatedOrderSchema,
  getOrderSchema,
  addItemSchema,
};
