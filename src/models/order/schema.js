const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  cartId: {
    type: String,
    required: [true]
  },
  items: [
    {
      menuId: String,
      quantity: Number
    }
  ]
}, {
  versionKey: false
}, { 
  timestamps: true 
});

module.exports = { schema };