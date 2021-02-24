const {createGame} = require("../models/games.models")
let db = require('../Schema');
const postGame = (req, res)=>{
  

let newGame = new db.Game(req.body); 
newGame.save((err, game)=> res.status(201).json({game})).catch((err)=>console.log(err))

};

module.exports = {postGame}