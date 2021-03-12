const passwordGenerator =()=>{

const secondChar = String.fromCharCode(Math.floor(Math.random() * 26) + 65);
const thirdChar = String.fromCharCode(Math.floor(Math.random() * 26) + 97);
const fourthChar = Math.floor(10 + Math.random() * 90);

const code = "$"+ secondChar+ thirdChar + fourthChar;

  return code
};


const radnomCoordinate = (size)=>{
  if(!size) return [];
  if(size === 1) return [1,1]
  let x = Math.round(Math.random() * size);
  let y = Math.round(Math.random() * size);
   if(x === 0) x++;
   if(y === 0) y++;
   return [x,y]
}
const separateSnake = (snake)=>{
  const body = [...snake];
  const head = body.shift();
  return {body, head }
}
const isSnakeEatingSnake = (snakeA, snakeB) =>{
  if(typeof snakeA !== "object" || typeof snakeB !== "object") return [];
  if(!snakeB.length) return snakeA;
  if(!snakeA.length) return []; 
   const {body , head} = separateSnake(snakeA);
   const headB = separateSnake(snakeB).head;  
   const [x,y] = headB
   let index = null;
  body.forEach((coordinate, i) => { 
    if(coordinate[0] === x && coordinate[1] === y) index = i;
  })
  const newBody = index || index === 0 ? body.slice(0,index) : body;
  
  const finalSnake =  [[...head], ...newBody];
   return finalSnake;
}

const snakeEatItself = (snake)=>{
  if(!snake.length) return [];
const {body , head} = separateSnake(snake);
const [x,y] = head;
let lose = false;
 body.forEach((coordinate, i) => { 
    if(coordinate[0] === x && coordinate[1] === y) lose = true;
  }); 
return lose ? [] : [...snake]
}
const checkSnake=(snake, food)=>{
  if (!snake.length) return false;
    const head = snake[0];
    const [x, y] = head;
    const [xF, yF] = food;
    if(x === xF && y === yF) return true;
    else return false
}
const checkFood = (food, snake)=>{
    let isInFood = false;
    const [xF, yF] = food;
    snake.forEach((coordinate)=>{
        const [x,y] = coordinate;
        if(x === xF && y === yF) isInFood = true;
    })
   return isInFood;
}


module.exports = {
  passwordGenerator, 
  radnomCoordinate, 
  isSnakeEatingSnake, 
  checkSnake, 
  checkFood,
  snakeEatItself
}