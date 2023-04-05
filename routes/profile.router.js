const express = require('express');
const passport = require('passport');
const orderService = require('../services/order.service');

const router = express.Router();
const service = new orderService();


router.get('/my-orders',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const {user} = req;
      const orders = await service.findByUser(user.sub);
      res.json(orders);
    } catch (e) {
      next(e);
    }
  }
);

module.exports = router
