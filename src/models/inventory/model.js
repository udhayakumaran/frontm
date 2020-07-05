const mongoose = require('mongoose');
const { schema } = require('./schema');
const Inventory = mongoose.model('Inventory', schema);


module.exports = { Inventory };