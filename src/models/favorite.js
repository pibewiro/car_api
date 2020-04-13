const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FavoriteSchema = new Schema({
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "user"
  },
  favoriteIds: {
    type: [String]
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Favorite', FavoriteSchema)