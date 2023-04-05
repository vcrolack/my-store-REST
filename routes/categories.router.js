const express = require('express');
const passport = require('passport');
const CategoryService = require('../services/category.service');
const validatorHandler = require('../middlewares/validator.handler');
const {
  getCategorySchema,
  createCategorySchema,
  updatedCategorySchema,
} = require('../schemas/category.schema');
const {checkRoles} = require ('../middlewares/auth.handler');

const router = express.Router();
const service = new CategoryService();

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  checkRoles(1, 2, 3),
  async (req, res, next) => {
    try {
      const categories = await service.find();
      res.status(200).json(categories);
    } catch (e) {
      next(e);
    }
  }
);

router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles(1, 2 , 3),
  validatorHandler(getCategorySchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const category = await service.findOne(id);
      res.status(200).json(category);
    } catch (e) {
      next(e);
    }
  }
);

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  checkRoles(1),
  validatorHandler(createCategorySchema, 'body'),
  async (req, res, next) => {
    try {
      console.log('Holaaaa')
      const body = req.body;
      const newCategory = await service.create(body);
      res.status(201).json(newCategory);
    } catch (e) {
      next(e);
    }
  }
);

router.patch(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles(1),
  validatorHandler(updatedCategorySchema, 'params'),
  validatorHandler(updatedCategorySchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const category = await service.update(id, body);
      res.status(200).json(category);
    } catch (e) {
      next(e);
    }
  }
);

router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles(1),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const result = await service.delete(id);
      res.status(202).json(result);
    } catch (e) {
      next(e);
    }
  }
);

module.exports = router;
