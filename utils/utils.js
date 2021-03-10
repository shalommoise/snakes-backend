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
  if(typeof snake1 !== "object" || typeof snake2 !== "object") return {snake1:[],snake2:[]};
    let body1 = [...snake1];
    let body2 = [...snake2];
    const head1 = body1.shift();
    const head2 = body2.shift();
    const [x1, y1] = head1;
    const [x2, y2] = head2;
    let index1 = null;
    let index2 = null;
  body2.forEach((coordinate, i) => { 
    if(coordinate[0] === x1 && coordinate[1] === y1) index2 = i;
  })
  body1.forEach((coordinate, i) => { 
    if(coordinate[0] === x2 && coordinate[1] === y2) index1 = i;
  })
  body2 = index2 || index2 === 0 ? body2.slice(0,index2) : body2;
  body1 = index1 || index1=== 0 ? body1.slice(0,index1) : body1;
 
    return {snake1: [head1, ...body1], snake2: [head2, ...body2]}
}

module.exports ={passwordGenerator, radnomCoordinate, isSnakeEatingSnake}