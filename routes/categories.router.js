const express = require('express');
const faker = require('faker');

const router = express.Router();

router.get('/', (req, res) => {
  const categories = [];
  const {size} = req.query;
  const limit = size || 10;
  for (let i = 0; i < limit; i++) {
    categories.push({
      name: faker.vehicle.type()
    })
  }
  res.json(categories);
})

router.get('/:id', (req, res) => {
  const { id } = req.params;
  res.json({
    name: faker.vehicle.type(),
    id
  })
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
