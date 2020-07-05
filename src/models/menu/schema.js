const mongoose = require('mongoose');
const moment = require('moment-timezone');
const Schema = mongoose.Schema;

const schema = new Schema({
  name: {
    type: String,
    required: [true],
  },
  type: {
    type: String,
    required: [true],
    enum: ['snack', 'breakfast', 'juice', 'dinner'],
  },
  cuisine: {
    type: String,
  },
  cost: {
    type: Number,
  }
}, {
  versionKey: false
}, { 
  timestamps: true 
});

schema.index({name: 1}, {unique: true});

module.exports = { schema };