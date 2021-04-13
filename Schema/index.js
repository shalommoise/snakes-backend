let mongoose = require('mongoose');
const {MONGODB_URI} = require('../mongodbURI');
console.log(MONGODB_URI)
mongoose.connect(
        MONGODB_URI ||
    'mongodb://localhost/snakes-be',
     { useNewUrlParser: true, useUnifiedTopology: true , serverSelectionTimeoutMS: 5000}
).then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err.reason));
mongoose.connection.on('connected', ()=>{
    console.log("Horray, mongoose is connected")
})
let Game = require("./game");

module.exports.Game = Game; 

