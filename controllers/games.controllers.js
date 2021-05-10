
let db = require('../Schema');
const {  isSnakeEatingSnake , checkSnake, snakeEatItself ,newFoodGenorator, didSnakeChange} = require("../utils/utils");
const {standardErr} = require('../errors')
const postGame = (req, res)=>{

let newGame = new db.Game(req.body); 
newGame.save((err, game)=> {
if(err) console.log(err)
 else {
        res.status(201).json({game})
    }
})


};

const getAllGames =(req,res)=>{
   const {live} = req.query;
if(live) {
  db.Game.find( {game_over: false, active: false, snake1: [[5,15],[4,15],[3,15]], snake2:[[26,15],[27,15],[28,15]], points1: 0, points2: 0, randomPlayerJoin: true},(err, games)=>{
if(err) console.log(err);
   res.json({games})
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
else{
     if(!game.snake1.length && !game.snake2.length)  endGame(id);
    res.json({game})
};
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
    const {player1,player2, snake1, snake2, active, game_over, randomPlayerJoin} = req.body;
  
db.Game.findOneAndUpdate({_id:id}, req.body,(err, game)=>{

     if(!game) standardErr(res, 404, "Sorry, this game can't be found");
else {
if(player2) game.player2 = player2;
if(player1) game.player1 = player1;
// if(randomPlayerJoin) console.log(randomPlayerJoin) 
game.randomPlayerJoin = randomPlayerJoin;
if(snake1){ 
    game.snake1 = snake1;
   if(checkSnake(snake1,game.food)) { 
       const newFood = newFoodGenorator(game.size, snake1);
    const newPoints = game.points1 + 1;
    foodAndPointsUpdate(id , newPoints, newFood , 1);
       game.food = newFood;
       game.points1++;
};

};
if(snake2) {
    game.snake2 = snake2;
     if(checkSnake(snake2,game.food)) { 
       
    const newFood = newFoodGenorator(game.size, snake2);
    const newPoints = game.points2 + 1;
    foodAndPointsUpdate(id , newPoints, newFood , 2);
     game.food = newFood;
     game.points2++;
};
    

};
const checkSnake12 = isSnakeEatingSnake(game.snake1, game.snake2);
const checkSnake21 = isSnakeEatingSnake(game.snake2, game.snake1);
const checkSnake1 = snakeEatItself(game.snake1);
const checkSnake2 = snakeEatItself(game.snake2);
if(didSnakeChange(game.snake1, checkSnake12)) {
    changeSnakeSize(id, checkSnake12,1);
       game.snake1 = checkSnake12;
}
else if(didSnakeChange(game.snake1, checkSnake1)) {
    changeSnakeSize(id, checkSnake1,1);
          game.snake1 = checkSnake1;
};
if(didSnakeChange(game.snake2, checkSnake21)) {
    changeSnakeSize(id, checkSnake21,2);
     game.snake2 = checkSnake21;
}
else if(didSnakeChange(game.snake2, checkSnake2)) {
    changeSnakeSize(id, checkSnake2,2);
        game.snake2 = checkSnake2;
};


if(!game.snake1.length && !game.snake2.length) { 
    endGame(id);
     game.game_over = true;
     game.active = false;
};
 

 if(active || active === false) game.active = active;
 if(game_over){ 
     game.game_over = game_over;
     game.active = false;
    }
    res.status(201).json({game})
};
}).catch((err)=>console.log(err))
}

const foodAndPointsUpdate = (id, points, foodLoc, snake) =>{

    db.Game.findOneAndUpdate({_id:id}, { [`points${snake}`]: points, food: foodLoc}, (err, game)=>{
        if(err)console.log(err);
    });
    
}

const changeSnakeSize = (id, snake, number)=>{
     db.Game.findOneAndUpdate({_id:id}, { [`snake${number}`]: snake}, (err, game)=>{
        if(err)console.log(err);
    });
}
const endGame =((id)=>{
    db.Game.findOneAndUpdate({_id:id}, { game_over: true, active: false}, (err, game)=>{
        if(err)console.log(err);
    });
})

module.exports = {postGame, getAllGames, delAllGames, getGameById, patchGame, removeGameById}