const validator = require('validator');
const jwt = require('jsonwebtoken');
const JwtModel = require('../src/models/jwt');
require('dotenv').config();

const verifyToken = async (req, res, next) => {
  const token = req.headers['x-access-token'];

  if (!token) return res.status(404).json({
    success: 'false',
    error: 'Unauthorized Absent Token'
  })

  try {
    const tokenBL = await JwtModel.findOne({
      jwt: token
    });

    if (!tokenBL) {
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(401).json({
          success: false,
          error: 'Unauthorized Invalid Token'
        });

        res.locals = decoded;
        return next();
      })
    } else {
      return res.status(400).json({
        success: false,
        error: 'Unauthorized Token Black Listed'
      })
    }
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      success: false,
      error: 'Internal Error'
    })
  }
}

module.exports = verifyToken