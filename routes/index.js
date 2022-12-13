const express = require('express');
const productsRouter = require('./products.router');
const usersRouter = require('./users.router');
const categoriesRouter = require('./categories.router');
const subcategoriesRouter = require('./subcategories.router');
const clientsRouter = require('./Clients.router');
const ordersRouter = require('./orders.router');

function routerApi (app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/products', productsRouter);
  router.use('/users', usersRouter);
  router.use('/categories', categoriesRouter);
  router.use('/subcategories', subcategoriesRouter);
  router.use('/clients', clientsRouter);
  router.use('/orders', ordersRouter);
}

module.exports = routerApi;
