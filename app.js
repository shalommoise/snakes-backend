const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());
const apiRouter = require("./routers/api.routers");
app.use("/api", apiRouter);
// let db = require('./Schema');
// app.post('/api/games/', (req, res) => {

//   let newGame = new db.Game(req.body);
//   newGame.save((err, game)=>{
//         if(err) console.log(`save err: ${err}`);
//         else { 
//              console.log(`new game added`)
//             res.json({game})
//             }
//   })
// });

module.exports = app;