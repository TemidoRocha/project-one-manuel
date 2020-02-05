const SQUARE_SIZE = 50; //the square size of the grid

const timer = document.querySelector('#timer'); //to update the timer
const score = document.querySelector('#score'); //to update the score

//images
let intro = new Image();
intro.src = './images/intro.png';

let gameOver = new Image();
gameOver.src = './images/game-over-png.png';

let youWin = new Image();
youWin.src = './images/youwin.png';

let bombImg = new Image();
bombImg.src = './images/bomb.png';

let explImg = new Image();
explImg.src = './images/explosion.png';
var shift = 0;
var frameWidth = 100;
var frameHeight = 100;
var totalFrames = 8;
var currentFrame = 0;

let playerImgL = new Image();
playerImgL.src = './images/sailboatL.png';
let playerImgR = new Image();
playerImgR.src = './images/sailboatR.png';

let pirateImg = new Image();
pirateImg.src = './images/pirates.png';
//pirateImg.addEventListener("load", loadImage, false);

let plasticImg = new Image();
plasticImg.src = './images/plastic.png';

let whaleImg = new Image();
whaleImg.src = './images/whale.png';
var shiftW = 0;
var frameWidthW = 120;
var frameHeightW = 60;
var totalFramesW = 7;
var currentFrameW = 0;

//arrrow images for the bullet
let arrowR = new Image();
arrowR.src = './images/arrow right.png';
let arrowL = new Image();
arrowL.src = './images/arrow left.png';
let arrowU = new Image();
arrowU.src = './images/arrow up.png';
let arrowD = new Image();
arrowD.src = './images/arrow down.png';



