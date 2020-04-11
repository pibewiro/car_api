const jwt = require('jsonwebtoken')
const User = require('../src/models/user')

require('dotenv').config()

const createUserToken = async (id) => {

  return jwt.sign({
    id
  }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  })

}

module.exports = createUserToken;