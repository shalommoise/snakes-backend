const {createGame} = require("../models/games.models")
const postGame = (req, res)=>{
  
const {player1} = req.body;

// createGame(player1).then((game)=>{
//   // res.status(201).send({game})
//    res.json({game})
// }).catch((err)=>console.log(err))
let db = require('../Schema');

  let newGame = new db.Game(player1);
  newGame.save((err, game)=>{
        if(err) console.log(`save err: ${err}`);
        else { 
          game.player1 = player1;
            console.log(game.player1)
            res.json({game})
            }
  })

};

module.exports = {postGame}