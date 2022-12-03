const express = require('express');
const CategoryService = require('../services/category.service');

const router = express.Router();
const service = new CategoryService();

router.get('/', (req, res) => {
  const categories = service.find();
  res.json(categories);
})

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const category = service.findOne(id);
  res.json(category);
})

router.get('/:categoryId/products/:productId', (req, res) => {
  const { categoryId, productId} = req.params;
  res.json({
    categoryId,
    productId,
    name: "Xbox juan"
  })
});

router.post('/', (req, res) => {
  const body = req.body;
  res.json({
    message: "create",
    data: body
  })
})

router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;
  res.json({
    message: "updated",
    data: body,
    id
  })
})

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;
  res.json({
    message: "updated",
    data: body,
    id
  })
})

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  res.json({
    message: "deleted",
    id
  })
})

module.exports = router;
