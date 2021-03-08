const request = require("supertest");
const app = require("../app");


describe("/api", ()=>{
  beforeEach(() => request(app).del("/api/games"));
    afterAll(() => request(app).del("/api/games"));
  describe("/games", ()=>{
    test('201 POST game', () => {
      return request(app)
      .post("/api/games/")
      .send({player1: "Sam"})
      .expect(201)
      .then((res)=>{
        expect(res.body.game.player1).toBe("Sam");
      })
    });
  test('200 GET all games', () => {
    return request(app).get("/api/games")
    .expect(200)
    .then((res)=>{
      const {games} = res.body;
      games.forEach((game)=>{
        const {player1, player2, snake1, snake2, food, points1,points2,game_over,active} = game
        expect(typeof player1).toBe("string");
        expect(typeof player2).toBe("string");
        expect(typeof snake1).toBe("object");
        expect(typeof snake2).toBe("object");
        expect(typeof food).toBe("object");
        expect(typeof points1).toBe("number");
        expect(typeof points2).toBe("number");
        expect(typeof game_over).toBe("boolean");
        expect(typeof active).toBe("boolean");
      })
    })
  });
  test("204 DEL all games", ()=>{
     return request(app).del("/api/games")
     .expect(204)
     .then((res)=>{
    
      expect(res.body).toEqual({})
    })
  })
    test('200 GET game by login_code', () => {
    return request(app)
      .post("/api/games/")
      .send({player1: "James"})
      .expect(201)
      .then((res)=>{
        const {login_code} = res.body.game;
        
        return request(app)
     .get(`/api/games?login_code=${login_code}`)
     .expect(200)
     .then((res)=>{
 
     expect(res.body.games[0].player1).toBe("James")
     })
      })
  });
  })
  describe("/:id", ()=>{
    test('200 GET game by id', () => {
      return request(app)
      .post("/api/games/")
      .send({player1: "James"})
      .expect(201)
      .then((res)=>{
      
     const {_id} = res.body.game;
     
     return request(app)
     .get(`/api/games/${_id}`)
     .expect(200)
     .then((res)=>{
 
       expect(res.body.game.player1).toBe("James");
     })
      })

    });
test('PATCH 201 change player2 name', () => {
   return request(app)
      .post("/api/games/")
      .send({player1: "Charlie"})
      .expect(201)
      .then((res)=>{
     const {_id} = res.body.game;
    
     return request(app)
     .patch(`/api/games/${_id}`)
     .send({player2: "Bart"})
     .expect(201)
     .then((res)=>{
  
       expect(res.body.game.player2).toBe("Bart")
     })
      })
});
test("PATCH 201 change player1 name", ()=>{
  return request(app)
      .post("/api/games/")
      .send({player1: "Charlie"})
      .expect(201)
      .then((res)=>{
     const {_id} = res.body.game;
    
     return request(app)
     .patch(`/api/games/${_id}`)
     .send({player1: "Bart"})
     .expect(201)
     .then((res)=>{
      
       expect(res.body.game.player1).toBe("Bart")
     })
      })
});
 
})

})