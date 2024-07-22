


let board;
let boardWidth = 360;
let boardHeight = 640;
let context;
let birdWidth = 34;
let birdHeight = 24;
let birdX = boardWidth/8;
let birdY = boardHeight/2;
let bird = {
  x : birdX,
  y : birdY,
  width : birdWidth,
  height : birdHeight
}
let birdImg;



let pipeArray = [];
let pipWidth = 64;
let pipHeight = 512;
let pipX = boardHeight;
let pipY = 0;
let topPipImg;
let bottomPipImg;


// game phis

let velocityX = -2;
let gravity = 0.2;
let velocityY = 0;
let gameOver = false;

const startGame = () => {
  
  
  const audio = document.getElementById("myAudio");
  audio.play();
  audio.volume = 1;
  
  board = document.getElementById('board');
  board.width = boardWidth;
  board.height = boardHeight;
  context = board.getContext("2d");
  
  
  birdImg =  new Image();
  birdImg.src = "./flappybird.png";
  birdImg.onload = () =>{
  context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);
  }
  
  topPipImg  =  new Image();
  topPipImg.src = "./toppipe.png";
  
bottomPipImg = new Image();
  bottomPipImg.src = "./bottompipe.png";
  
  requestAnimationFrame(update);
  setInterval(placePip, 1500);
  document.addEventListener("keydown", moveBird);
  document.addEventListener("click", moveBird2);
}

 function Run() {
  startGame();
  boardMain.style.display = 'block';
  const boardMain = document.getElementById("board");
 }
 
function update() {
  requestAnimationFrame(update);
  if (gameOver) {
    return
  }
  if (bird.y > board.height) {
    gameOver = true;
  }
  context.clearRect(0, 0, board.width, board.height);
  context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);
  
  velocityY += gravity;
  bird.y = Math.max(bird.y + velocityY, 0);
  
  for (let i = 0; i < pipeArray.length; i++) {
   let pipe = pipeArray[i];
   pipe.x += velocityX;
context.drawImage(pipe.img, pipe.x, pipe.y, pipe.width, pipe.height);

if (ColisionDection(bird, pipe)) {
gameOver = true;
window.location.reload();
}
  }
  
}

function placePip() {
  if (gameOver) {
    return window.location.reload();
  }
  let randomPipY = pipY - pipHeight/4 - Math.random()*(pipHeight/2);
  let openSpace = pipHeight/4;
  let topPipe = {
    img : topPipImg,
    x : pipX,
    y : randomPipY,
    width : pipWidth,
    height : pipHeight,
    passed : false
  }
  pipeArray.push(topPipe);
  
  
  
  let bottomPipe = {
    img: bottomPipImg,
    x: pipX,
    y: randomPipY + pipHeight + openSpace,
    width: pipWidth,
    height: pipHeight,
    passed: false
  }
  pipeArray.push(bottomPipe);
}

function moveBird(e) {
  console.log(e);
  if (e.code == "space"  || e.code == "ArrowUp" || e.code == "click") {
    velocityY = -6;
  }
}
function moveBird2() {
  // Tab to edit
  velocityY = -6;
}


function ColisionDection(a, b) {
  return a.x < b.x + b.width &&
  a.x + a.width > b.x && 
  a.y < b.y + b.height && 
  a.y + a.height > b.y;
}

