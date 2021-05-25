exports.getInfo =(req, res)=>{

res.json({
  Greeting: "Welcome to the Snakes-API",
  msg: "This serves as the backend for the snakes game",
  backendRepo: "https://github.com/shalommoise/snakes-backend",
  frontEndGame: "https://doublesnakes.netlify.app/",
  emailDeveloper: "shalommoise@hotmail.co.uk"
})
  
}