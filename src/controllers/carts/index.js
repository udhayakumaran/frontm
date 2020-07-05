const { Router: router } = require('express');

const { get } = require('./get');
const { create } = require('./create');
const { addItem } = require('./add-item');
const { placeOrder } = require('./place-order');

module.exports = (models, { config }) => {
  const api = router();

  api.post('/', create(models, { config }));
  api.get('/:cartId', get(models, { config }));
  api.post('/add-item/:cartId', addItem(models, { config }));
  api.post('/place-order/:cartId', placeOrder(models, { config }));

  return api;
};