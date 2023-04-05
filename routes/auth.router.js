const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const {config} = require('../config/config');

const router = express.Router();

router.post(
  '/login',
  passport.authenticate('local', { session: false }),
  async (req, res, next) => {
    try {
      const { user } = req;

      const payload = {
        sub: user.id,
        role: user.roleId,
      };
      const token = jwt.sign(payload, config.jwtSecret);
      res.status(200).json({
        user,
        token
      });
    } catch (e) {
      next(e);
    }
  }
);

module.exports = router;
