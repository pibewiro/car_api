const path = require('path');
const User = require('../models/user')
const hashPassword = require('../../utils/hashPassword')
const checkUser = require('../../utils/checkUsers');
const makeId = require('../../utils/makeId')


const UserController = {
  async index(req, res, next) {

    let user;

    let limit = req.query.limit;
    let page = req.query.page;
    let skip = parseInt(limit) * (parseInt(page) - 1);

    try {

      if (limit && page) {
        user = await User.find({
          active: true
        }).skip(skip).limit(parseInt(limit)).sort({
          firstname: -1
        })
      } else {
        user = await User.find({
          active: true
        })
      }


      const total = await User.countDocuments();

      return res.status(200).json({
        success: false,
        total,
        data: user
      })
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        success: false,
        error: 'Internal Error'
      })
    }
  },

  async store(req, res, next) {
    const img = req.files.images;
    const name = makeId(10) + img.name;
    const ext = path.extname(name);

    let {
      password,
      email,
      username
    } = req.body;

    try {

      const {
        errors
      } = checkUser(email, username);

      if (errors) {
        return res.status(401).json({
          success: false,
          data: errors
        })
      }

      if (!img.mimetype.startsWith('image')) {
        return res.status(400).json({
          error: 'Invalid photo'
        })
      }

      req.body.password = await hashPassword(password)
      req.body.imageUrl = name;
      img.mv(`images/${name}`)

      let user = await User.create(req.body);
      user.save();

      return res.status(201).json({
        success: true,
        data: user
      })
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        success: false,
        data: 'Internal Failure'
      })
    }
  },

  async update(req, res, next) {

    const userId = res.locals.id;
    const {
      id
    } = req.params.id;

    if (res.locals.id !== userId) {
      return res.status(400).json({
        success: false,
        error: 'Unautorized user'
      })
    }

    try {
      const user = await User.updateOne({
        _id: userId
      }, {
        ...req.body
      })

      return res.status(200).json({
        success: true,
      })
    } catch (err) {
      console.log(err)

      return res.status(500).json({
        error: 'Internal Error'
      })
    }
  },

  async delete(req, res, next) {
    const userId = res.locals.id;
    const {
      id
    } = req.params

    if (userId !== id) {
      return res.status(400).json({
        error: 'Unauthorized'
      })
    }

    try {
      const user = await User.updateOne({
        _id: userId,
        active: true
      }, {
        active: false
      });


      return res.status(200).json({
        success: true,
        msg: `User ${userId} Deleted`
      });
    } catch (err) {
      console.log(err)

      return res.status(500).json({
        error: 'Internal Error'
      })
    }
  },

  async get(req, res, next) {
    const token = req.headers['x-access-token'];
    const {
      id
    } = req.params

    if (!token) {
      return res.status(404).json({
        error: 'Unauthorized'
      });
    }

    try {

      const user = await User.findById(id);

      if (!user) return res.status(404).json({
        error: 'No User Found'
      });

      return res.status(200).json({
        data: user
      })

    } catch (err) {
      return res.status(500).json({
        error: 'Internal Error'
      });

    }
  }
}

module.exports = UserController;