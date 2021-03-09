
let db = require('../Schema');
const {passwordGenerator} = require("../utils/utils")
const postGame = (req, res)=>{
  
const {login_code} = req.body;
let newGame = new db.Game(req.body); 
newGame.save((err, game)=> {
if(err) console.log(err)
 else {
     game.login_code = login_code ? login_code : passwordGenerator();

     res.status(201).json({game})
    }
})


};

const getAllGames =(req,res)=>{
    const {login_code} = req.query;
  
   db.Game.find((err, allGames)=>{
if(err) console.log(err);
else {
    if(login_code) {
 const game = allGames.filter((game)=>game.login_code = login_code);
     res.json({games: game})
    }
   
   else res.json({
        games: allGames
    })
}
    })
}


const delAllGames =(req,res)=>{
  db.Game.deleteMany({ active: false  }, function (err) {
  if(err) console.log(err);
  res.status(204).json({games: []})
});
}

const getGameById =(req,res)=>{
    const {_id} = req.params
db.Game.findOne(_id, (err, game)=>{
    if(err) console.log(err);
else res.json({game});
})
}

const patchGame = (req,res)=>{
    const {id} = req.params;
    
db.Game.findOneAndUpdate(id, req.body,(err, game)=>{
    
    if(err) console.log(err);
else {
const {player1,player2, snake1, snake2, active} = req.body;

if(player2) game.player2 = player2;
if(player1) game.player1 = player1;
if(snake1) game.snake1 = snake1;
if(snake2) game.snake2 = snake2;
// if(active) 
game.active = active;
    res.status(201).json({game})
};
})
}

module.exports = {postGame, getAllGames, delAllGames, getGameById, patchGame}