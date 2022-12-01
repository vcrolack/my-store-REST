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

module.exports = router;
