const SQUARE_SIZE = 50; //the square size of the grid

const timer = document.querySelector('#timer'); //to update the timer
const score = document.querySelector('#score'); //to update the score

//images
let gameOver = new Image();
gameOver.src = './images/game-over-png.png';

let youWin = new Image();
youWin.src = './images/youwin.png';

let bombImg = new Image();
bombImg.src = './images/bomb.png';

let playerImg = new Image();
playerImg.src = './images/sailboat.png';

let pirateImg = new Image();
pirateImg.src = './images/pirates.png';

let plasticImg = new Image();
plasticImg.src = './images/plastic.png';