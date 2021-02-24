const gamesRouter = require("express").Router();

const {postGame, getAllGames, delAllGames} = require("../controllers/games.controllers")

gamesRouter.route("/").post(postGame).get(getAllGames).delete(delAllGames);

module.exports = gamesRouter;