const express = require('express');
const passport = require('passport');
const AuthService = require('../services/auth.service');
const {
  recoveryPasswordSchema,
} = require('../schemas/recovery-password.schema');
const validatorHandler = require('../middlewares/validator.handler');

const router = express.Router();
const service = new AuthService();

router.post(
  '/login',
  passport.authenticate('local', { session: false }),
  async (req, res, next) => {
    try {
      const { user } = req;
      res.json(service.signToken(user));
    } catch (e) {
      next(e);
    }
  }
);

router.post('/recovery', async (req, res, next) => {
  try {
    const { email } = req.body;
    const result = await service.sendRecovery(email);
    res.json(result);
  } catch (e) {
    next(e);
  }
});

router.post(
  '/change-password',
  validatorHandler(recoveryPasswordSchema, 'body'),
  async (req, res, next) => {
    try {
      const { token, newPassword } = req.body;
      const result = await service.changePassword(token, newPassword);
      res.json(result);
    } catch (e) {
      next(e);
    }
  }
);

module.exports = router;
