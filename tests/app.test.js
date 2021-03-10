const request = require("supertest");
const app = require("../app");


describe("/api", ()=>{
  beforeEach(() => {return request(app).del("/api/games")});
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
     .send({player2: "Debbie"})
     .expect(201)
     .then((res)=>{
  
       expect(res.body.game.player2).toBe("Debbie")
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
     .send({player1: "Debbie"})
     .expect(201)
     .then((res)=>{
      
       expect(res.body.game.player1).toBe("Debbie")
     })
      })
});
 test("PATCH 201 snake1", ()=>{
   return request(app)
      .post("/api/games/")
      .send({player1: "charles"})
      .expect(201)
      .then((res)=>{
     const {_id, snake1} = res.body.game;
    
     return request(app)
     .patch(`/api/games/${_id}`)
     .send({snake1: [[6,15],[7,15],[8,15]]})
     .expect(201)
     .then((res)=>{
      
       expect(res.body.game.snake1).toEqual([[6,15],[7,15],[8,15]]);
        expect(res.body.game.snake1).not.toEqual(snake1)
     })
      })
 })

 test("PATCH 201 snake2", ()=>{
   return request(app)
      .post("/api/games/")
      .send({player1: "charles"})
      .expect(201)
      .then((res)=>{
     const {_id, snake2} = res.body.game;
    
     return request(app)
     .patch(`/api/games/${_id}`)
     .send({snake2: [[25,15],[26,15],[27,15]]})
     .expect(201)
     .then((res)=>{
      
       expect(res.body.game.snake2).toEqual([[25,15],[26,15],[27,15]]);
        expect(res.body.game.snake2).not.toEqual(snake2)
     })
      })
 })
 test("PATCH 201 start game", ()=>{
   return request(app)
      .post("/api/games/")
      .send({player1: "charlie"})
      .expect(201)
      .then((res)=>{
     const {_id} = res.body.game;
    
     return request(app)
     .patch(`/api/games/${_id}`)
     .send({active: true})
     .expect(201)
     .then((res)=>{
      
       expect(res.body.game.active).toBe(true);
        
     })
      })
 })
 test("PATCH 201 pause game", ()=>{
   return request(app)
      .post("/api/games/")
      .send({player1: "Jamie", player2: "William"})
      .expect(201)
      .then((res)=>{
     const {_id} = res.body.game;
     return request(app)
     .patch(`/api/games/${_id}`)
     .send({active: true})
     .expect(201)
     .then((res)=>{
     return request(app)
    .patch(`/api/games/${res.body.game._id}`)
     .send({active: false})
     .expect(201)
     .then((res)=>{
       expect(res.body.game.active).toBe(false);
     })
     })
      })
 })
 test("PATCH 201 Game over to true", ()=>{
   return request(app)
      .post("/api/games/")
      .send({player1: "Bill", player2: "Brian"})
      .expect(201)
      .then((res)=>{
        const {_id} = res.body.game;
     return request(app)
     .patch(`/api/games/${_id}`)
     .send({game_over: true})
     .expect(201)
     .then((res)=>{
       expect(res.body.game.game_over).toBe(true);
     })
      })
 })
  test("PATCH 201 Game over to true, sets active to false", ()=>{
   return request(app)
      .post("/api/games/")
      .send({player1: "Adam", player2: "Eve"})
      .expect(201)
      .then((res)=>{
        const {_id} = res.body.game;
     return request(app)
     .patch(`/api/games/${_id}`)
     .send({game_over: true, active: true})
     .expect(201)
     .then((res)=>{
       expect(res.body.game.game_over).toBe(true);
       expect(res.body.game.active).toBe(false);
     })
      })
 })
 test('PATCH 201 if snake1 head reaches food points1++', () => {
   return request(app)
      .post("/api/games/")
      .send({player1: "Samuel", player2: "David"})
      .expect(201)
      .then((res)=>{
          const {_id, food} = res.body.game;
          const copyFood =[...food];
  return request(app)
     .patch(`/api/games/${_id}`)
     .send({snake1: [copyFood, [26,15],[27,15]] })
     .expect(201)
     .then((res)=>{
       const {points1} = res.body.game;
       expect(points1).toBe(1);
       
     })
      })
 });
 test('PATCH 201 if snake2 head reaches food points2++', () => {
   return request(app)
      .post("/api/games/")
      .send({player1: "Abraham", player2: "Sarah"})
      .expect(201)
      .then((res)=>{
          const {_id, food} = res.body.game;
          const copyFood =[...food];
  return request(app)
     .patch(`/api/games/${_id}`)
     .send({snake2: [copyFood, [26,15],[27,15]] })
     .expect(201)
     .then((res)=>{
       const {points2} = res.body.game;
       expect(points2).toBe(1);
       
     })
      })
 });
 test('PATCH 201 if snake1 or snake2 reaches food, randomCooridinate', () => {
   return request(app)
      .post("/api/games/")
      .send({player1: "Isaac", player2: "Rebecca"})
      .expect(201)
      .then((res)=>{
          const {_id, food} = res.body.game;
          const copyFood =[...food];
  return request(app)
     .patch(`/api/games/${_id}`)
     .send({snake2: [copyFood, [26,15],[27,15]] })
     .expect(201)
     .then((res)=>{
       const {food} = res.body.game;
       expect(food[0]).not.toEqual(copyFood[0]);
       expect(food[1]).not.toEqual(copyFood[1]);
     })
      })
 });
})
// next to make tests for snake eating itself: lose?
test.only("201 PATCH snake bites other snake reduces other snake's length", ()=>{
return request(app)
      .post("/api/games/")
      .send({player1: "Jacob", player2: "Rachel"})
      .expect(201)
      .then((res)=>{
    const {_id} = res.body.game;
return request(app)
     .patch(`/api/games/${_id}`)
     .send({snake2: [[24,15],[25,15], [26,15],[27,15]], snake1: [[26,15],[26,14],[26,13],[26,12]]})
     .expect(201).
     then((res)=>{
      //  console.log(res.body.game.snake2)
       expect(res.body.game.snake2).toEqual([[24,15],[25,15]])
     })
      })

})
//snake eating other snake : shortens other snake
})