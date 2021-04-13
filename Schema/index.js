let mongoose = require('mongoose');
const {MONGODB_URI} = require('../mongodbURI')
mongoose.connect(
        MONGODB_URI ||
    'mongodb://localhost/snakes-be',
     { useNewUrlParser: true, useUnifiedTopology: true }
).then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));
mongoose.connection.on('connected', ()=>{
    console.log("Horray, mongoose is connected")
})
let Game = require("./game");

module.exports.Game = Game; 

