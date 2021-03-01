const gamesRouter = require("express").Router();

const {postGame, getAllGames, delAllGames, getGameById} = require("../controllers/games.controllers")

gamesRouter.route("/").post(postGame).get(getAllGames).delete(delAllGames);
gamesRouter.route("/:id").get(getGameById)
module.exports = gamesRouter;