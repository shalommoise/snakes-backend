const {createGame} = require("../models/games.models")
let db = require('../Schema');
const postGame = (req, res)=>{
  

let newGame = new db.Game(req.body); 
newGame.save((err, game)=> {
if(err) console.log(err)
 else res.status(201).json({game})
})


};

const getAllGames =(req,res)=>{
    db.Game.find((err, allGames)=>{
if(err) console.log(err);
else {
    res.json({
        games: allGames
    })
}
    })
}

module.exports = {postGame, getAllGames}