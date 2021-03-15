
let db = require('../Schema');
const {passwordGenerator, radnomCoordinate, isSnakeEatingSnake , checkSnake, checkFood, snakeEatItself } = require("../utils/utils");
const {standardErr} = require('../errors')
const postGame = (req, res)=>{
  
const {login_code} = req.body;
let newGame = new db.Game(req.body); 
newGame.save((err, game)=> {
if(err) console.log(err)
 else {
        res.status(201).json({game})
    }
})


};

const getAllGames =(req,res)=>{
    const {login_code} = req.query;
      if(login_code) {
  db.Game.findOne({ login_code}, (err, game)=>{
     if(err) console.log(err);
     else  res.json({game})
    })
    }
    else db.Game.find((err, allGames)=>{
if(err) console.log(err);
   res.json({
        games: allGames
    })
    })
}


const delAllGames =(req,res)=>{
  db.Game.deleteMany({}, function (err) {
  if(err) console.log(err);
  res.status(204).json({games: []})
})
}

const getGameById =(req,res)=>{
    const {id} = req.params
db.Game.findOne({_id: id}, (err, game)=>{
    if(!game) standardErr(res, 404, "Sorry, this game can't be found");
else res.json({game});
})
}
const removeGameById =(req,res)=>{
     const {id} = req.params;
  db.Game.findOneAndDelete({_id:id}, (err, game)=>{
    if(!game) standardErr(res, 404, "Sorry, this game can't be found");
else res.status(204).json({msg: "Game removed"});
})
}

const patchGame = (req,res)=>{
    const {id} = req.params;
    const {player1,player2, snake1, snake2, active, game_over, login_code} = req.body;
    if(login_code) standardErr(res, 405, "Sorry, can't change login_code")
db.Game.findOneAndUpdate({_id:id}, req.body,(err, game)=>{
    if(err) console.log(err);
else {
if(player2) game.player2 = player2;
if(player1) game.player1 = player1;
if(snake1){ 
    game.snake1 = snake1;
   if(checkSnake(snake1,game.food)) { 
       game.points1++ 
       game.food = radnomCoordinate(game.size);
};
if (checkFood(game.food, snake1)) game.food = radnomCoordinate(game.size)
};
if(snake2) {
    game.snake2 = snake2;
     if(checkSnake(snake2,game.food)) { 
       game.points2++ 
       game.food = radnomCoordinate(game.size);
};
    
if (checkFood(game.food, snake2)) game.food = radnomCoordinate(game.size)
};
game.snake1 = isSnakeEatingSnake(game.snake1, game.snake2);
game.snake2 = isSnakeEatingSnake(game.snake2, game.snake1);
game.snake1 = snakeEatItself(game.snake1);
game.snake2 = snakeEatItself(game.snake2);
if(!game.snake1.length && !game.snake2.length) game.game_over = true; 

 if(active || active === false) game.active = active;
 if(game_over){ 
     game.game_over = game_over;
     game.active = false;
    }
    res.status(201).json({game})
};
})
}



module.exports = {postGame, getAllGames, delAllGames, getGameById, patchGame, removeGameById}