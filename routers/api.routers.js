const apiRouter = require("express").Router();
const gamesRouter = require("./games.routers");

apiRouter.use("/games", gamesRouter);

module.exports = apiRouter;