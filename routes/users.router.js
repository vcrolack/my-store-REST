const express = require('express');
const faker = require('faker');

const router = express.Router();

router.get('/', (req, res) => {
  const users = [];
  const {size} = req.query;
  const limit = size || 10;
  for (let i = 0; i < limit; i++) {
    users.push({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      jobTitle: faker.name.jobTitle(),
    })
  }
  res.json(users);
})

router.get('/:id', (req, res) => {
  const {id} = req.params;
  res.json({
    name: faker.name.firstName(),
    lastName: faker.name.lastName(),
    id
  })
})

router.post('/', (req, res) => {
  const body = req.body;
  res.json({
    name: "created",
    body
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
  const body = body;
  res.json({
    message: "updated",
    data: body,
    id
  })
})

router.delete('/:id', (req, res) => {
  const { id } = res.params;
  res.json({
    message: "deleted",
    id
  })
})

module.exports = router;
