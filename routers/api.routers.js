const apiRouter = require("express").Router();
const gamesRouter = require("./games.routers");

apiRouter.use("/games", gamesRouter);

apiRouter.route("*", ()=>{
  console.log("hello router")
  res.status(404).json({msg: "Sorry, page is not found"})
})
module.exports = apiRouter;