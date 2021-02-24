const gamesRouter = require("express").Router();

const {postGame, getAllGames} = require("../controllers/games.controllers")

gamesRouter.route("/").post(postGame).get(getAllGames);

module.exports = gamesRouter;