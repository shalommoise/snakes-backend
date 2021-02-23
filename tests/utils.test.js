const {passwordGenerator, radnomCoordinate, strToArr, arrToStr} = require("../utils/utils");

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
    console.log(code1, code2)
    const lastOfCode1 = code1[3] + code1[4];
    const lastOfCode2 = code2[3] + code2[4];
    expect(lastOfCode1).not.toBe(lastOfCode2);
  });
})

describe("radnomCoordinate", ()=>{
  test('returns empty string', () => {
    expect(radnomCoordinate()).toBe("")
  });
  test('returns 1', () => {
    expect(radnomCoordinate(1)).toBe("1:1")
  });
  test('returns random for 10', () => {
      const size1 = radnomCoordinate(10);
      const size2 = radnomCoordinate(10);
     
    expect(size1).not.toBe(size2);
  });

  test('Coordinate cannot be 0', () => {

    const arr = radnomCoordinate(10).split(":")
      expect(arr[0]).not.toBe("0")
      expect(arr[1]).not.toBe("0")
  });
  test('coordinates must be whole numbers', () => {
    const arr = radnomCoordinate(30).split(":");
    expect(arr[0] > 0 && arr[0] <= 30).toBe(true);
    expect(arr[1] > 0 && arr[1] <= 30).toBe(true);
    expect(arr[0] % 1).toBe(0);
    expect(arr[1] % 1).toBe(0);
   
  });
})

describe("strToArr", ()=>{
it('empty str returns empty array', () => {
  expect(strToArr()).toEqual([]);
});
it('one number to array', () => {
  expect(strToArr('12')).toEqual([12]);
});
it('convert coordinate str', () => {
  expect(strToArr('12:7')).toEqual([[12, 7]]);
});
it('convert multiple coordinate strs', () => {
  expect(strToArr('12:7,12:8')).toEqual([[12, 7],[12,8]]);
});
it('separate snake head', () => {
   expect(strToArr('28:15,27:15|29:15')).toEqual([[[28,15],[27,15]],[29,15]]);
});
it('Large snake', ()=>{
  expect(strToArr('20:14,20:15,21:15,22:15,23:15,24:15,25:15,26:15,28:15,27:15|29:15')).toEqual([[[20,14],[20,15],[21,15],[22,15],[23,15],[24,15],[25,15],[26,15],[28,15],[27,15]],[29,15]])
})
})

describe("arrToStr", ()=>{
  it('returns empty array', ()=>{
    expect(arrToStr()).toBe('');
  })
  it('empty array to string', ()=>{
      expect(arrToStr([])).toBe('');
  })
  it("array with 1 number", ()=>{
      expect(arrToStr([55])).toBe('55');
  })
  it("convert 1 coordinate", ()=>{
      expect(arrToStr([30,12])).toBe('30:12');
  })
  it("convert 2 cooridnates", ()=>{
    expect(arrToStr([[[12, 7],[12,8]]])).toBe('12:7,12:8');
  })
it("convert multiple cooridnates", ()=>{
    expect(arrToStr([[[12, 7],[12,8], [13,8],[13,7]]])).toBe('12:7,12:8,13:8,13:7');
  })
  it("converts snakeHead", ()=>{
    expect(arrToStr([[[27,15],[28,15]],[29,15]])).toBe('27:15,28:15|29:15');
  })
  it('Large snake', ()=>{
  expect(arrToStr([[[20,14],[20,15],[21,15],[22,15],[23,15],[24,15],[25,15],[26,15],[28,15],[27,15]],[29,15]])).toBe('20:14,20:15,21:15,22:15,23:15,24:15,25:15,26:15,28:15,27:15|29:15')
})
})