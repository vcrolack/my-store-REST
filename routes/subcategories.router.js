const express = require('express');
const SubcategoryService = require('../services/subcategory.service');
const validatorHandler = require('../middlewares/validator.handler');
const {
  getSubcategorySchema,
  createSubcategorySchema,
  updatedSubcategorySchema,
} = require('../schemas/category.schema');
const passport = require('passport');

const router = express.Router();
const service = new SubcategoryService();

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const subcategories = service.find();
      res.status(200).json(subcategories);
    } catch (e) {
      next(e);
    }
  }
);

router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(getSubcategorySchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const subcategory = service.findOne(id);
      res.status(200).json(subcategory);
    } catch (e) {
      next(e);
    }
  }
);

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(createSubcategorySchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newSubcategory = await service.create(body);
      res.status(201).json(newSubcategory);
    } catch (e) {
      next(e);
    }
  }
);

router.patch(
  '/id',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(updatedSubcategorySchema, 'params'),
  validatorHandler(updatedSubcategorySchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const subcategory = await service.update(id, body);
      res.status(200).json(subcategory);
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
      const response = await service.delete(id);
      res.status(202).json(response);
    } catch (e) {
      next(e);
    }
  }
);

module.exports = router;
