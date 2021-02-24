const request = require("supertest");
const app = require("../app");


describe("/api", ()=>{
  describe("/games", ()=>{
    test('201 POST game', () => {
      return request(app)
      .post("/api/games/")
      .send({player1: "Sam"})
      // .expect(201)
      .then((res)=>{
       console.log(res.body)
        expect(res.body.game.player1).toBe("Sam");
      })
    });
  })
})