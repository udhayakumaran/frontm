const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  menuId: {
    type: Schema.Types.ObjectId,
    required: [true],
  },
  qty: {
    type: Number,
  }
}, {
  versionKey: false
}, { 
  timestamps: true 
});

module.exports = { schema };