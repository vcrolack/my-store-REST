const express = require('express');
const OrderService = require('../services/order.service');
const validatorHandler = require('../middlewares/validator.handler');
const {
  updatedOrderSchema,
  createOrderSchema,
  getOrderSchema,
} = require('../schemas/Order.schema');

const router = express.Router();
const service = new OrderService();

router.get('/', async (req, res, next) => {
  try {
    const orders = await service.find();
    res.status(200).json(orders);
  } catch (e) {
    next(e);
  }
});

router.get(
  '/:id',
  validatorHandler(getOrderSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const order = await service.findOne(id);
      res.status(200).json(order);
    } catch (e) {
      next(e);
    }
  }
);

router.post(
  '/',
  validatorHandler(createOrderSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newOrder = await service.create(body);
      res.status(201).json(newOrder);
    } catch (e) {
      next(e);
    }
  }
);

router.patch(
  '/:id',
  validatorHandler(updatedOrderSchema, 'params'),
  validatorHandler(updatedOrderSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const order = await service.update(id, body);
      res.status(200).json(order);
    } catch (e) {
      next(e);
    }
  }
);

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await service.delete(id);
    res.status(200).json(response);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
