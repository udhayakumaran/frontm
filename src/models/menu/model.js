const mongoose = require('mongoose');
const { schema } = require('./schema');
const Menu = mongoose.model('Menu', schema);


module.exports = { Menu };