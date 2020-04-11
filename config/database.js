const mongoose = require("mongoose")
require('dotenv').config();

const connectDB = async () => {

  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: true,
      useUnifiedTopology: true
    })

    console.log("Connected Database:", conn.connection.host)
  } catch (err) {
    console.log(err)
  }


}

module.exports = connectDB;