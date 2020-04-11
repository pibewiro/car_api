const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const CarSchema = new Schema({
  make: {
    type: String,
    required: true
  },
  model: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  year: {
    type: String,
    required: true
  },
  mileage: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  vin: {
    type: String,
    required: true
  },
  description: {
    type: String,
  },

  imageUrl: [String],

  active: {
    type: Boolean,
    required: true
  },
}, {
  timestamps: true
})

module.exports = mongoose.model('Car', CarSchema);