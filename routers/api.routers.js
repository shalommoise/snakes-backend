const apiRouter = require("express").Router();
const gamesRouter = require("./games.routers");
const {getInfo} = require("../controllers/api.controller");

apiRouter.route("/").get(getInfo);
apiRouter.use("/games", gamesRouter);


module.exports = apiRouter;