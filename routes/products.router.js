const express = require('express');
const ProductService = require('../services/product.service');

const router = express.Router();
const service = new ProductService();

router.get('/', async (req, res) => {
  try {
    const products = await service.find();
    res.status(200).json(products);
  } catch (e) {
    res.status(404).json({
      message: e.message,
    });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await service.findOne(id);
    res.status(200).json(product);
  } catch (e) {
    res.status(404).json({
      message: e.message,
    });
  }
});

router.post('/', async (req, res) => {
  try {
    const body = req.body;
    const newProduct = await service.create(body);
    res.status(201).json(newProduct);
  } catch (e) {
    res.json({
      message: e.message,
    });
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const product = await service.update(id, body);
    res.json(product);
  } catch (e) {
    res.status(404).json({
      message: e.message,
    });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = service.delete(id);
    res.json(result);
  } catch (e) {
    res.status(404).json({
      message: e.message,
    });
  }
});

module.exports = router;
