const gamesRouter = require("express").Router();

const {postGame} = require("../controllers/games.controllers")

gamesRouter.route("/").post(postGame);

module.exports = gamesRouter;