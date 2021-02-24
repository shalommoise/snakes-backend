

let db = require('../Schema');

const createGame = (player1 )=>{

let newGame = new db.Game(player1)
//  console.log(newGame)
 
newGame.save((err, game)=>{
        // if(err) console.log(`save err: ${err}`);
             console.log(`new game added`)
              // game.player1 = player1
     return game
})
}


module.exports = {createGame}