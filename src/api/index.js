const express = require('express');

const { errorHandler } = require('../middleware');
const { Menu } = require('../models/menu');
const { Cart } = require('../models/cart');
const { Order } = require('../models/order');

const menu = require('../controllers/menus');
const cart = require('../controllers/carts');

const models = { Menu, Cart, Order };

const routersInit = config => {
  const router = express();

  router.use('/menu', menu(models, { config }));
  router.use('/cart', cart(models, { config }));

  router.use(errorHandler);
  return router;
};

module.exports = routersInit;