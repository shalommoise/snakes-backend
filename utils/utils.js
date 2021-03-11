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

const isSnakeEatingSnake = (snake1, snake2) =>{
  if(typeof snake1 !== "object" || typeof snake2 !== "object") return {newSnake1:[],newSnake2:[]};
    let body1 = [...snake1];
    let body2 = [...snake2];
    let head1 = body1.shift();
    let head2 = body2.shift();
    const [x1, y1] = head1;
    const [x2, y2] = head2;
    let index1 = null;
    let index2 = null;
    let lose1 = false;
    let lose2 = false;
  body2.forEach((coordinate, i) => { 
    if(coordinate[0] === x1 && coordinate[1] === y1) index2 = i;
    if(coordinate[0] === x2 && coordinate[1] === y2) lose2 = true;
  })
  body1.forEach((coordinate, i) => { 
    if(coordinate[0] === x2 && coordinate[1] === y2) index1 = i;
    if(coordinate[0] === x1 && coordinate[1] === y1) lose1 = true;
  })
  body2 = index2 || index2 === 0 ? body2.slice(0,index2) : body2;
  body1 = index1 || index1=== 0 ? body1.slice(0,index1) : body1;
  if(lose1) {head1 = [] ; body1 = []};
  const newSnake1 = lose1 ? [] : [head1, ...body1];
  const newSnake2 = lose2 ? [] : [head2, ...body2];
    return {newSnake1, newSnake2}
}

const checkSnake=(snake, food)=>{
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
  checkFood
}