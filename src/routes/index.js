const express = require('express')
const user = require('../routes/user')
const auth = require('../routes/auth')
const car = require('../routes/car')
const favorite = require('../routes/favorite')

const app = express();

app.use([user, auth, car, favorite])


module.exports = app;