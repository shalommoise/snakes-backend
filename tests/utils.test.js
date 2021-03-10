const {passwordGenerator, radnomCoordinate, isSnakeEatingSnake} = require("../utils/utils");

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

  test('last two charcters should be random numbers', () => {
    const code1 = passwordGenerator();
    const code2 = passwordGenerator();
    const lastOfCode1 = code1[3] + code1[4];
    const lastOfCode2 = code2[3] + code2[4];
    expect(lastOfCode1).not.toBe(lastOfCode2);
  });
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


describe.only("isSnakeEatingSnake()", ()=>{
  test("empty snakes returns empty array", ()=>{
    expect(isSnakeEatingSnake()).toEqual({snake1:[],snake2:[]})
  });
   test("string snakes returns empty array", ()=>{
    expect(isSnakeEatingSnake("gsg","sgg")).toEqual({snake1:[],snake2:[]})
  });
  test('snakes are NOT eating each other', () => {
    expect(isSnakeEatingSnake([[26,15],[27,15],[28,15]] ,[[5,15],[4,15],[3,15]])).toEqual({snake1:[[26,15],[27,15],[28,15]],snake2:[[5,15],[4,15],[3,15]] })
  });
  test('snake1 eats snake2', () => {
    const snake1 = [[25,15],[26,15],[26,14],[26,13],[26,12]];
    const snake2 = [[24,15],[25,15], [26,15],[27,15]];
    expect(isSnakeEatingSnake(snake1, snake2)).toEqual({snake1 ,snake2:[[24,15]]})
  });
  test('snake2 eats snake1', () => {
    const snake2 = [[25,15],[26,15],[26,14],[26,13],[26,12]];
    const snake1 = [[24,15],[25,15], [26,15],[27,15]];
    expect(isSnakeEatingSnake(snake1, snake2)).toEqual({snake1:[[24,15]] ,snake2})
  });
})
