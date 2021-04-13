const {passwordGenerator, radnomCoordinate, isSnakeEatingSnake, snakeEatItself, didSnakeChange} = require("../utils/utils");

describe("passwordGenerator",()=>{
  test('Returns string', () => {
    expect(typeof passwordGenerator()).toBe("string")
  });
  test('string length should be 5 ', () => {
    expect(passwordGenerator().length).toBe(5)
  });
  test('first character is "$"', ()=>{
      expect(passwordGenerator()[0]).toBe("$")
  })
  test('2nd & 3rd characters should be letters', () => {
    
    const abc = ["a","b","c","d","e", "f", "g", "h", "i", "j", "k", "l", "m","n","o","p","q","r","s","t", "u","v","w","x","y","z", 'A', 'B', 'C', 'D', 'E', 'F','G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R','S', 'T', 'U', 'V', 'W', 'X','Y', 'Z']
    expect(abc.includes(passwordGenerator()[1])).toBe(true)
    expect(abc.includes(passwordGenerator()[2])).toBe(true)
  });
 test('2nd should be upperCase, 3rd lowercase', () => {
    
    const abc = ["a","b","c","d","e", "f", "g", "h", "i", "j", "k", "l", "m","n","o","p","q","r","s","t", "u","v","w","x","y","z", ];
    const ABC =['A', 'B', 'C', 'D', 'E', 'F','G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R','S', 'T', 'U', 'V', 'W', 'X','Y', 'Z']
    expect(ABC.includes(passwordGenerator()[1])).toBe(true)
    expect(abc.includes(passwordGenerator()[2])).toBe(true)
  });


  test('last two charcters should be seconds', ()=>{
      const code1 = passwordGenerator();
  expect(code1[3]+code1[4]).toBe(Date().split(" ")[4].split(":")[2])
  })
})

describe("radnomCoordinate", ()=>{
  test('returns empty array', () => {
    expect(radnomCoordinate()).toEqual([])
  });
  test('returns 1', () => {
    expect(radnomCoordinate(1)).toEqual([1,1])
  });
  test('returns random for 10', () => {
      const size1 = radnomCoordinate(10);
      const size2 = radnomCoordinate(10);
     
    expect(size1).not.toBe(size2);
  });

  test('Coordinate cannot be 0', () => {

    const arr = radnomCoordinate(10)
      expect(arr[0]).not.toBe("0")
      expect(arr[1]).not.toBe("0")
  });
  test('coordinates must be whole numbers', () => {
    const arr = radnomCoordinate(30)
    expect(arr[0] > 0 && arr[0] <= 30).toBe(true);
    expect(arr[1] > 0 && arr[1] <= 30).toBe(true);
    expect(arr[0] % 1).toBe(0);
    expect(arr[1] % 1).toBe(0);
   
  });
})


describe("isSnakeEatingSnake()", ()=>{
  test("empty snakes returns empty array", ()=>{
    expect(isSnakeEatingSnake()).toEqual([])
  });
   test("string snakes returns empty array", ()=>{
    expect(isSnakeEatingSnake("gsg","sgg")).toEqual([])
  });
  test('snakes are NOT eating each other', () => {
    const snake1 = [[26,15],[27,15],[28,15]];
    const snake2 = [[5,15],[4,15],[3,15]];
    expect(isSnakeEatingSnake(snake1 ,snake2)).toEqual([[26,15],[27,15],[28,15]])
  });
  test('snake1 eats snake2', () => {
    const snake1 = [[25,15],[26,15],[26,14],[26,13],[26,12]];
    const snake2 = [[24,15],[25,15], [26,15],[27,15]];
    expect(isSnakeEatingSnake(snake2, snake1)).toEqual([[24,15]])
  });
  test('snake2 eats snake1', () => {
    const snake1 = [[24,15],[25,15], [26,15],[27,15]];
    const snake2 = [[25,15],[26,15],[26,14],[26,13],[26,12]];
    expect(isSnakeEatingSnake(snake1, snake2)).toEqual([[24,15]])
  });
  
})

describe("snakeEatItself()", ()=>{
  test('snake is empty', () => {
    const snake =[];
     expect(snakeEatItself(snake)).toEqual([]);
  });
  test("snake doesn't eat itself", () => {
    const snake = [[35,15],[36,15],[36,14],[36,13],[36,12]];
    expect(snakeEatItself(snake)).toEqual([[35,15],[36,15],[36,14],[36,13],[36,12]]);
  });
test('snake1 eats itslef makes it go to []', ()=>{
    const snake = [[24,12],[24,13],[25,13],[26,13],[26,12],[25,12],[24,12],[23,12]];
     expect(snakeEatItself(snake)).toEqual([]);
  })
  
})
describe.only("didSnakeChange", ()=>{
  test("snakes did not change", ()=>{
    const newSnake = [[5,15],[4,15],[3,15]];
    const oldSnake = [[5,15],[4,15],[3,15]];
    expect(didSnakeChange(oldSnake, newSnake)).toBe(false)
  });
  test("snakes did change", ()=>{
    const newSnake = [[5,16],[5,15]];
    const oldSnake = [[5,15],[4,15],[3,15]];
    expect(didSnakeChange(oldSnake, newSnake)).toBe(true)
  })
})