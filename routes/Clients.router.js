const express = require('express');
const ClientService = require('../services/client.service');
const validatorHandler = require('../middlewares/validator.handler');
const {
  createClientSchema,
  updatedClientSchema,
  getClientSchema,
} = require('../schemas/client.schema');

const router = express.Router();
const service = new ClientService();

router.get('/', async (req, res, next) => {
  try {
    const clients = await service.find();
    res.status(200).json(clients);
  } catch (e) {
    next(e);
  }
});

router.get(
  '/:id',
  validatorHandler(getClientSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const client = await service.findOne(id);
      res.status(200).json(client);
    } catch (e) {
      next(e);
    }
  }
);

router.post(
  '/',
  validatorHandler(createClientSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newClient = await service.create(body);
      res.status(201).json(newClient);
    } catch (e) {
      next(e);
    }
  }
);

router.patch('/:id', validatorHandler(updatedClientSchema, 'params'), validatorHandler(updatedClientSchema, 'body'), async (req, res, next) => {
  try {
    const {id} = req.params;
    const body = req.body;
    const client = await service.update(id, body);
    res.status(200).json(client);
  } catch (e) {
    next(e);
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const {id} = req.params;
    const result = await service.delete(id);
    res.status(200).json(result);
  } catch (e) {
    next(e);
  }
})

module.exports = router;
