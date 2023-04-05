const express = require('express');
const passport = require('passport');
const ClientService = require('../services/client.service');
const validatorHandler = require('../middlewares/validator.handler');
const {
  createClientSchema,
  updatedClientSchema,
  getClientSchema,
} = require('../schemas/client.schema');
const {checkRoles} = require('../middlewares/auth.handler');

const router = express.Router();
const service = new ClientService();

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  checkRoles(1),
  async (req, res, next) => {
    try {
      const clients = await service.find();
      res.status(200).json(clients);
    } catch (e) {
      next(e);
    }
  }
);

router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles(1),
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
  passport.authenticate('jwt', { session: false }),
  checkRoles(1),
  validatorHandler(createClientSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newData = {
        ...body,
        user: {
          ...body.user,
          roleId: 3,
        },
      };
      const newClient = await service.create(newData);
      res.status(201).json(newClient);
    } catch (e) {
      next(e);
    }
  }
);

router.patch(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles(1),
  validatorHandler(updatedClientSchema, 'params'),
  validatorHandler(updatedClientSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const client = await service.update(id, body);
      res.status(200).json(client);
    } catch (e) {
      next(e);
    }
  }
);

router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles(1),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const result = await service.delete(id);
      res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  }
);

module.exports = router;
