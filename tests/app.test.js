const request = require("supertest");
const app = require("../app");


describe("/api", ()=>{
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
  
  
 describe("?live=true", ()=>{
  it("Get only games waiting to be played", ()=>{
 return request(app)
      .post("/api/games/")
      .send({player1: "James"})
      .then(()=> request(app).post("/api/games/")
      .send({player1: "Charles", game_over: true}))
      .then(()=> request(app).post("/api/games/").send({player1: "William", player2: "bill", randomPlayerJoin: false}))
       .then(()=>request(app).post("/api/games/").send({player1: "Bill", active: true})) 
      .then(()=>{
        return request(app)
        .get("/api/games?live=true")
        .expect(200)
        .then((res)=>{
          expect(res.body.games.length).toBe(1)
        })
      })
  })
  it("Post randomPlayerJoin to true", ()=>{
    return request(app)
      .post("/api/games/")
      .send({player1: "James", randomPlayerJoin: false})
      .expect(201)
      .then((res)=>{
        expect(res.body.game.randomPlayerJoin).toBe(false)
      })
  })
  it("Change randomPlayerJoin to true", ()=>{
    return request(app)
      .post("/api/games/")
      .send({player1: "James"})
      .then((res)=>{
         expect(res.body.game.randomPlayerJoin).toBe(true)
         const {_id} = res.body.game
         return request(app)
         .patch(`/api/games/${_id}`)
         .send({randomPlayerJoin: false})
         .expect(201)
         .then((res)=>{
           expect(res.body.game.randomPlayerJoin).toBe(false)
         })
      })
  })
  })
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
test('201 PATCH change player2 name', () => {
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
test("201 PATCH change player1 name", ()=>{
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
 test("201 PATCH snake1", ()=>{
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

 test("201 PATCH snake2", ()=>{
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
 test("201 PATCH start game", ()=>{
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
 test("201 PATCH pause game", ()=>{
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
 test("201 PATCH Game over to true", ()=>{
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
  test("201 PATCH Game over to true, sets active to false", ()=>{
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
 test('201 PATCH if snake1 head reaches food points1++', () => {
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
 test('201 PATCH if snake2 head reaches food points2++', () => {
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
 test('201 PATCH if snake1 or snake2 reaches food, randomCooridinate', () => {
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
test("201 PATCH snake bites other snake reduces other snake's length", ()=>{
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
       expect(res.body.game.snake2).toEqual([[24,15],[25,15]]);
     })
      })
})

test("201 PATCH snake itself and turns to []", ()=>{
return request(app)
      .post("/api/games/")
      .send({player1: "Michael", player2: "Gabe"})
      .expect(201)
      .then((res)=>{
    const {_id} = res.body.game;
return request(app)
     .patch(`/api/games/${_id}`)
     .send({snake1: [[24,12],[24,13],[25,13],[26,13],[26,12],[25,12],[24,12],[23,12]]})
     .expect(201).
     then((res)=>{
       expect(res.body.game.snake1).toEqual([])
     })
      })
})

 test("201 PATCH game_over to true when both snakes are []", ()=>{
   return request(app)
      .post("/api/games/")
      .send({player1: "Simon", player2: "Timmy"})
      .expect(201)
      .then((res)=>{
    const {_id} = res.body.game;
return request(app)
     .patch(`/api/games/${_id}`)
     .send({
       snake1: [],
       snake2: [[24,12],[24,13],[25,13],[26,13],[26,12],[25,12],[24,12],[23,12]]
      })
     .expect(201).
     then((res)=>{
       expect(res.body.game.snake1).toEqual([]);
       expect(res.body.game.snake2).toEqual([]);
       expect(res.body.game.game_over).toBe(true);
      })
})
})
 })
 describe("Errors", ()=>{
 test("404 ERR mispelling", ()=>{
     return request(app)
    .get("/api/gmes")
    .expect(404)
    .then((res)=>{
      expect(res.body.msg).toBe("Sorry, page is not found")
    })
  })
  test('404 game id not found', () => {
    return request(app)
    .get("/api/games/604b71f4142de24ba6fe049a")
    .expect(404)
    .then((res)=>{
      expect(res.body.msg).toBe("Sorry, this game can't be found")
    })
  });
  
   test('404 delete game that does not exist', ()=>{
    
 return request(app)
     .delete('/api/games/604b71f4142de24ba6fe049a')
     .expect(404)
     .then((res)=>{
       expect(res.body.msg).toBe("Sorry, this game can't be found")
     })
    })
  
  test('404 PATCH game that does not exist', ()=>{
    
 return request(app)
     .patch('/api/games/604b71f4142de24ba6fe049a')
     .expect(404)
     .then((res)=>{
       expect(res.body.msg).toBe("Sorry, this game can't be found")
     })
    })
   
  })
})