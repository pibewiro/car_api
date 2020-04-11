const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const fileUpload = require('express-fileupload');
const cors = require('cors')
const morgan = require('morgan')
const db = require("./database")
const routes = require('../src/routes')

class App {

  constructor() {
    this.server = express();
    this.database()
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json())
    this.server.use(fileUpload());
    this.server.use(cors())
    this.server.use(morgan('dev'))
  }

  routes() {
    this.server.use("/api/v1", routes);
    this.server.use("/images", express.static(path.join(__dirname, '../', 'images')))
  }

  database() {
    db()
  }
}

module.exports = new App().server