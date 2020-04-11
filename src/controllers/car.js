const path = require('path')
const Car = require('../models/car')
const authenticate = require('../../utils/verifyToken');
const makeId = require('../../utils/makeId')

const carController = {
  async index(req, res, next) {

    let car;
    let total;
    let limit = parseInt(req.query.limit);
    let page = parseInt(req.query.page);
    let skip = limit * (page - 1);
    try {

      if (page && limit) {
        car = await Car.find({
          active: true
        }).skip(skip).limit(limit).populate({
          path: 'user',
          select: 'firstname lastname address.city address.state'
        }).sort({
          createdAt: -1
        })

      } else {
        car = await Car.find({
          active: true
        }).populate({
          path: 'user',
          select: 'firstname lastname address.city address.state'
        }).sort({
          createdAt: -1
        })
      }

      total = await Car.countDocuments();

      return res.status(200).json({
        success: true,
        total,
        data: car
      })

    } catch (err) {
      console.log(err)

      return res.status(500).json({
        success: false,
        error: 'Internal Error'
      })
    }


  },

  async get(req, res, next) {
    const {
      id
    } = req.params;

    try {
      const car = await Car.findById(id).populate({
        path: 'user',
        select: 'firstname lastname'
      })

      if (!car) return res.status(400).json({
        success: false,
        error: "No User Found"
      })

      return res.status(200).json({
        success: true,
        data: car
      })
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        error: 'Internal Error'
      })
    }
  },

  async store(req, res, next) {
    console.log(req.files)
    const {
      make,
      model,
      color,
      price,
      year,
      mileage,
      user
    } = req.body;

    if (!make || !model || !color || !price || !year || !mileage || !user) {
      return res.status(400).json({
        error: 'All Fields Must be filled'
      })
    }

    try {
      const img = req.files.imageUrl;
      const fileLength = req.files.imageUrl.length;
      let imageUrls = [];
      let imagename;
      let ext;

      for (let i = 0; i < fileLength; i++) {
        ext = path.extname(img[i].name).toLowerCase();
        imagename = `${makeId(30)}${ext}`
        img[i].mv(`images/${imagename}`)
        imageUrls.push(imagename);
        req.body.imageUrl = imageUrls;
      }

      const car = await Car.create(req.body);
      car.save();

      return res.status(200).json({
        success: false,
        data: car
      })
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        error: "Internal Error"
      })
    }
  },

  async update(req, res, next) {
    const {
      id
    } = req.params;
    const userId = res.locals.id;

    try {


      try {
        const userCar = await Car.findOne({
          user: userId
        });

        if (userCar.user !== userId) {
          return res.status(401).json({
            error: 'Unauthorized'
          })
        }
      } catch (err) {
        console.log(err);
        return res.status(500).json({
          error: 'Internal Error'
        })
      }



      const car = await Car.updateOne({
        _id: id
      }, {
        ...req.body
      });

      return res.status(200).json({
        success: true,
        msg: `User ${userId} Updated`
      })
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        error: 'Internal Error'
      })

    }
  },

  async delete(req, res, next) {
    const {
      id
    } = req.params;
    const userId = res.locals.id;

    try {
      const userCar = await Car.findOne({
        user: userId
      });

      if (userCar.user !== userId) {
        return res.status(401).json({
          error: 'Unauthorized'
        })
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        error: 'Internal Error'
      })
    }

    try {

      const car = await Car.updateOne({
        _id: id
      }, {
        active: false
      });

      return res.status(200).json({
        success: true,
        msg: `User ${userId} Deleted`
      })
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        error: 'Internal Error'
      })

    }
  }
}

module.exports = carController;