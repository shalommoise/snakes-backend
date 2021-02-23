let mongoose = require('mongoose');

mongoose.connect(
    process.env.MONGODB_URI ||
    'mongodb://localhost/snakes-be'
);

let Game = require("./game");

module.exports.Game = Game; 