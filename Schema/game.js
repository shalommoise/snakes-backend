let mongoose = require('mongoose'),
    Schema = mongoose.Schema;
const { radnomCoordinate} = require("../utils/utils")
let GameSchema =  new Schema({
  
  player1: { type: String, default: "player1" },
  player2: { type: String, default: "player2" },
  snake1: { type: Array, default: [[5,15],[4,15],[3,15]] },
  snake2: { type: Array, default: [[26,15],[27,15],[28,15]] },
  food: { type: Array, default: radnomCoordinate(30) },
  points1: { type: Number, default: 0 },
  points2: { type: Number, default: 0 },
  game_over: { type: Boolean, default: false },
  active: { type: Boolean, default: false }, 
  size: { type: Number, default: 30 },
  date: { type: Date, default: Date.now },
  randomPlayerJoin: { type: Boolean, default: true }
});

let Game = mongoose.model('Game', GameSchema)

module.exports = Game;