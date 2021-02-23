let mongoose = require('mongoose'),
    Schema = mongoose.Schema;

let GameSchema =  new Schema({
  // name: String,
  // gender: String,
  // age: Number,
  // likable: Boolean
});

let Game = mongoose.model('Game', GameSchema)

module.exports = Game;