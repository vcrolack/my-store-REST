const express = require('express');
const productsRouter = require('./products.router');
const usersRouter = require('./users.router');
const categoriesRouter = require('./categories.router');
const subcategoriesRouter = require('./subcategories.router');
const clientRouter = require('./Clients.router');

function routerApi (app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/products', productsRouter);
  router.use('/users', usersRouter);
  router.use('/categories', categoriesRouter);
  router.use('/subcategories', subcategoriesRouter);
  router.use('/clients', clientRouter);
}

module.exports = routerApi;
