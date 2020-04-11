const mongoose = require('mongoose')
const Schema = mongoose.Schema

const JwtSchema = new Schema({
  jwt: {
    type: String
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Jwt', JwtSchema);