const express = require('express');
const UserService = require('../services/user.service');
const validatorHandler = require('../middlewares/validator.handler');
const {
  updatedUserSchema,
  createUserSchema,
  getUserSchema,
} = require('../schemas/user.schema');
const passport = require('passport');

const router = express.Router();
const service = new UserService();

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const users = await service.find();
      res.status(200).json(users);
    } catch (e) {
      next(e);
    }
  }
);

router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(getUserSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await service.findOne(id);
      res.status(200).json(user);
    } catch (e) {
      next(e);
    }
  }
);

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(createUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newUser = await service.create(body);
      res.status(201).json(newUser);
    } catch (e) {
      next(e);
    }
  }
);

router.patch(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(getUserSchema, 'params'),
  validatorHandler(updatedUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const user = await service.update(id, body);
      res.status(200).json(user);
    } catch (e) {
      next(e);
    }
  }
);

router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const result = await service.delete(id);
      res.json(result);
    } catch (e) {
      next(e);
    }
  }
);

module.exports = router;
