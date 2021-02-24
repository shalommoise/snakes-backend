let mongoose = require('mongoose'),
    Schema = mongoose.Schema;
const {passwordGenerator, radnomCoordinate} = require("../utils/utils")
let GameSchema =  new Schema({
  login_code: { type: String, default: passwordGenerator() },
  player1: { type: String, default: "player1" },
  player2: { type: String, default: "player2" },
  snake1: { type: Array, default: [[[2,15],[3,15]],[4,15]] },
  snake2: { type: Array, default: [[[29,15],[28,15]],[27,15]] },
  food: { type: Array, default: radnomCoordinate(30) },
  points1: { type: Number, default: 0 },
  points2: { type: Number, default: 0 },
  game_over: { type: Boolean, default: false },
  active: { type: Boolean, default: false }, 
  date: { type: Date, default: Date.now }
});

let Game = mongoose.model('Game', GameSchema)

module.exports = Game;