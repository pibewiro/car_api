const Favorite = require('../models/favorite');
const Car = require('../models/car');
const User = require('../models/user')


const FavoriteController = {

  async get(req, res, next) {

    const {
      userId
    } = req.params;

    try {
      const favorite = await Favorite.findOne({
        userId
      })

      const car = await Car.find({
        _id: favorite.favoriteIds
      }).populate({
        path: 'user',
        select: 'address.city address.state, firstname, lastname'
      })

      return res.status(200).json({
        data: car,
        favoriteIds: favorite.favoriteIds
      })
    } catch (err) {
      return res.status(200).json({
        error: "Internal Failure"
      })
    }
  },

  async store(req, res, next) {

    const {
      favoriteIds,
      userId
    } = req.body;

    let favorite;

    try {
      favorite = await Favorite.findOne({
        userId
      })

      if (!favorite) {
        let favArr = [];
        favorite = await Favorite()
        favorite.userId = userId;
        favArr.push(favoriteIds);
        favorite.favoriteIds = favArr;
        favorite.save();
      } else {
        favorite.favoriteIds.push(favoriteIds)
        favorite.save();
      }

      return res.status(200).json({
        data: favorite.favoriteIds
      })
    } catch (err) {
      console.log(err);
      return res.status(200).json({
        error: 'Internal Error'
      })
    }
  },

  async delete(req, res, next) {
    const {
      userId,
      favId
    } = req.params;

    try {
      const favorite = await Favorite.findOne({
        userId
      })
      const fav = favorite.favoriteIds.filter(res => res !== favId)
      favorite.favoriteIds = fav;
      favorite.save();
      return res.status(200).json({
        data: favorite.favoriteIds
      });

    } catch (err) {
      console.log(err)
      return res.status(500).json({
        error: 'Internal Error'
      })
    }
  }
}


module.exports = FavoriteController;