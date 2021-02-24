
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
const delAllGames =(req,res)=>{
  db.Game.deleteMany({ active: false  }, function (err) {
  if(err) console.log(err);
  res.status(204).json({games: []})
});
}
module.exports = {postGame, getAllGames, delAllGames}