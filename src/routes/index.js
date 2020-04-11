const express = require('express')
const user = require('../routes/user')
const auth = require('../routes/auth')
const car = require('../routes/car')

const app = express();

app.use([user, auth, car])


module.exports = app;