const express = require('express');
const passport = require('passport');
const RoleService = require('../services/role.service');
const validatorHandler = require('../middlewares/validator.handler');
const {
  updatedRoleSchema,
  createRoleSchema,
  getRoleSchema,
} = require('../schemas/role.schema');
const {checkRoles} = require('../middlewares/auth.handler');

const router = express.Router();
const service = new RoleService();

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  checkRoles(1),
  async (req, res, next) => {
    try {
      const roles = await service.find();
      res.status(200).json(roles);
    } catch (e) {
      next(e);
    }
  }
);

router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles(1),
  validatorHandler(getRoleSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const role = await service.findOne(id);
      res.status(200).json(role);
    } catch (e) {
      next(e);
    }
  }
);

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  checkRoles(1),
  validatorHandler(createRoleSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newRole = await service.create(body);
      res.status(201).json(newRole);
    } catch (e) {
      next(e);
    }
  }
);

router.patch(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles(1),
  validatorHandler(updatedRoleSchema, 'params'),
  validatorHandler(updatedRoleSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const role = await service.update(id, body);
      res.status(200).json(role);
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
      const result = service.delete(id);
      res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  }
);

module.exports = router;
