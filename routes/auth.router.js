const express = require('express');
const passport = require('passport');

const router = express.Router();

router.post(
  '/login',
  passport.authenticate('local', { session: false }),
  async (req, res, next) => {
    try {
      const { user } = req;
      res.status(200).json({ data: user, message: 'Logged in' });
    } catch (e) {
      next(e);
    }
  }
);

module.exports = router;
