const express = require('express');
const UserService = require('../services/user.service');

const router = express.Router();
const service = new UserService();

router.get('/', (req, res) => {
  const users = service.find();
  res.status(200).json(users);
})

router.get('/:id', (req, res) => {
  const {id} = req.params;
  const user = service.findOne(id);
  res.json(user);
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
