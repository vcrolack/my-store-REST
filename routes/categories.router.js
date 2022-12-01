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

router.get('/:categoryId/products/:productId', (req, res) => {
  const { categoryId, productId} = req.params;
  res.json({
    categoryId,
    productId,
    name: "Xbox juan"
  })
});

module.exports = router;
