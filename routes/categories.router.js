const express = require('express');
const CategoryService = require('../services/category.service');
const validatorHandler = require('../middlewares/validator.handler');
const {
  getCategorySchema,
  createCategorySchema,
  updatedCategorySchema,
} = require('../schemas/category.schema');

const router = express.Router();
const service = new CategoryService();

router.get('/', async (req, res, next) => {
  try {
    const categories = await service.find();
    res.status(200).json(categories);
  } catch (e) {
    next(e);
  }
});

router.get(
  '/:id',
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
  validatorHandler(createCategorySchema, 'body'),
  async (req, res, next) => {
    try {
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

router.delete('/:id',async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await service.delete(id);
    res.status(202).json(result);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
