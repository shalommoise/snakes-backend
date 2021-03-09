const gamesRouter = require("express").Router();

const {postGame, getAllGames, delAllGames, getGameById, patchGame, removeGameById} = require("../controllers/games.controllers")

gamesRouter.route("/").post(postGame).get(getAllGames).delete(delAllGames);
gamesRouter.route("/:id").get(getGameById).patch(patchGame).delete(removeGameById)
module.exports = gamesRouter;