const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uuid = require('uuid')

const schema = new Schema({
  cartId: {
    type: String,
    required: [true],
    default: function genUUID() {
      return uuid.v4();
    }
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