const express = require('express');
const CategoryService = require('../services/category.service');

const router = express.Router();
const service = new CategoryService();

router.get('/', async (req, res) => {
  try {
    const categories = service.find();
    res.status(200).json(categories);
  } catch (e) {
    res.status(404).json({
      message: e.message,
    });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const category = service.findOne(id);
    res.status(200).json(category);
  } catch (e) {
    res.status(404).json({
      message: e.message,
    });
  }
});

router.post('/', async (req, res) => {
  try {
    const body = req.body;
    const newCategory = await service.create(body);
    res.status(201).json(newCategory);
  } catch (e) {
    res.status(401).json({
      message: e.message,
    });
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const category = await service.update(id, body);
    res.status(200).json(category);
  } catch (e) {
    res.status(404).json({
      message: e.message,
    });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await service.delete(id);
    res.status(202).json(result);
  } catch (e) {
    res.status(404).json({
      message: e.message,
    });
  }
});

module.exports = router;
