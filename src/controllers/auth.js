const User = require('../models/user')
const Jwt = require('../models/jwt')
const createToken = require('../../utils/createToken')
const bcrypt = require('bcryptjs')

const AuthController = {
  async login(req, res) {

    const {
      email,
      password
    } = req.body;

    let error = {}

    if (!email) error.email = "Email Required"
    if (!password) error.password = "Password Required"

    if (Object.keys(error).length > 0) {
      return res.status(400).json(error)
    }

    const user = await User.findOne({
      email
    }).select('+password');

    if (!user) {
      error.invalid = 'Invalid Login Details';
      return res.status(400).json(error)
    }

    const matchPassword = await bcrypt.compare(password, user.password);

    if (!matchPassword) {
      error.invalid = 'Invalid Login Details';
      return res.status(400).json(error)
    }



    const token = await createToken(user._id);

    const auth = await User.updateOne({
      _id: user._id
    }, {
      $set: {
        jwt: token,
        last_login: Date.now()
      }
    })

    return res.status(200).json({
      success: true,
      data: {
        id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        favorite: user.favorite
      },
      token
    })

  },

  async logout(req, res) {
    const token = req.headers['x-access-token'];

    try {
      const jwt = await Jwt.create({
        jwt: token
      })
      jwt.save();
      return res.status(200).json({
        success: true,
        data: token,
        msg: 'Logged Out'
      })
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        error: 'Internal Error'
      })
    }
  }
}

module.exports = AuthController;