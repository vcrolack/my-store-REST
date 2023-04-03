const express = require('express');
const ProductService = require('../services/product.service');
const validatorHandler = require('../middlewares/validator.handler');
const {
  updatedProductSchema,
  createProductSchema,
  getProductSchema,
  queryProductSchema,
} = require('../schemas/product.schema');
const passport = require('passport');

const router = express.Router();
const service = new ProductService();

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(queryProductSchema, 'query'),
  async (req, res, next) => {
    try {
      const products = await service.find(req.query);
      res.status(200).json(products);
    } catch (e) {
      next(e);
    }
  }
);

router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = await service.findOne(id);
      res.status(200).json(product);
    } catch (e) {
      next(e);
    }
  }
);

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(createProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newProduct = await service.create(body);
      res.status(201).json(newProduct);
    } catch (e) {
      next(e);
    }
  }
);

router.patch(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updatedProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const product = await service.update(id, body);
      res.status(200).json(product);
    } catch (e) {
      next(e);
    }
  }
);

router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const result = service.delete(id);
      res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  }
);

module.exports = router;
