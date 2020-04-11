const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true
  },

  password: {
    type: String,
    select: false,
    hidden: true,
    required: true
  },

  imageUrl: {
    type: String,
  },
  address: {
    city: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    },
    zip: {
      type: String,
    }
  },

  phone: {
    type: String,
    required: true
  },

  active: {
    type: Boolean,
    required: true
  },

  token: {
    type: String,
  },

  last_login: {
    type: Date,
  },
}, {
  timestamps: true
})

module.exports = mongoose.model('User', UserSchema)