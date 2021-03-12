const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());
const apiRouter = require("./routers/api.routers");
app.use("/api", apiRouter);

app.all("*", (req, res, next) => {
  res.status(404).send({ msg: "Sorry, page is not found" });
});
module.exports = app;