const express = require('express');
const UserService = require('../services/user.service');

const router = express.Router();
const service = new UserService();

router.get('/', (req, res) => {
  try {
    const users = service.find();
    res.status(200).json(users);
  } catch (e) {
    res.status(404).json({
      message: e.message,
    });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const user = await service.findOne(id);
    res.status(200).json(user);
  } catch (e) {
    res.status(404).json({
      message: e.message,
    });
  }
});

router.post('/', async (req, res) => {
  try {
    const body = req.body;
    const newUser = await service.create(body);
    res.status(201).json(newUser);
  } catch (e) {
    res.status(404).json({
      message: e.message,
    });
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const user = service.update(id, body);
    res.status(200).json(user);
  } catch (e) {
    res.status(404).json({
      message: e.message,
    });
  }
});

router.delete('/:id', (req, res) => {
  try {
    const { id } = res.params;
    const result = service.delete(id);
    res.json(result);
  } catch (e) {
    res.status(404).json({
      message: e.message,
    });
  }
});

module.exports = router;
