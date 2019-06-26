var gamePieceOne;
var score = 0;
var speed = 1;
var scoreBox = document.querySelector("#scoreBox");
var eHigh = document.querySelector("#eS");
var mHigh = document.querySelector("#mS");
var hHigh = document.querySelector("#hS");
var iHigh = document.querySelector("#iS");
var eHighScore;
var mHighScore;
var hHighScore;
var iHighScore;
var increment = 0.005;
var obstacle = false;
var mode = "easy";

/* Game mode changes */
function easy() {
  obstacle = false;
  speed = 1;
  increment = 0.005;
  mode = "easy";
}

function medium() {
  obstacle = true;
  speed = 1.5;
  increment = 0.01;
  mode = "medium";
}

function hard() {
  obstacle = true;
  speed = 2;
  increment = 0.05;
  mode = "hard";
}

function impossible() {
  obstacle = false;
  speed = 4;
  increment = 0.01;
  mode = "impossible";
}

/* Assign high score cookies */
if(localStorage.eHighScore) {
  eHighScore = localStorage.eHighScore
} else {
  eHighScore = 0;
  localStorage.eHighScore = 0;
}

if(localStorage.mHighScore) {
  mHighScore = localStorage.mHighScore
} else {
  mHighScore = 0;
  localStorage.mHighScore = 0;
}

if(localStorage.hHighScore) {
  hHighScore = localStorage.hHighScore
} else {
  hHighScore = 0;
  localStorage.hHighScore = 0;
}

if(localStorage.iHighScore) {
  iHighScore = localStorage.iHighScore
} else {
  iHighScore = 0;
  localStorage.iHighScore = 0;
}

/* Initialize canvas and game object */
function startGame() {
  myCanvas.start();
  gamePieceOne = new gamePiece(30, 30, randomValue(400), randomValue(400), "red");
}

/* Ends game and checks high scores */
function endGame() {
  /* High Score Checking */
  switch(mode) {
    case "easy":
        if(score > eHighScore) {
          eHighScore = score;
          localStorage.eHighScore = eHighScore;
        }
      break;

    case "medium":
        if(score > mHighScore) {
          mHighScore = score;
          localStorage.mHighScore = mHighScore;
        }
      break;
    case "hard":
        if(score > hHighScore) {
          hHighScore = score;
          localStorage.hHighScore = hHighScore;
        }
      break;
    case "impossible":
        if(score > iHighScore) {
          iHighScore = score;
          localStorage.iHighScore = iHighScore;
        }
      break;
  }
  /* Reset or close game */
  if(window.confirm("Game over! You scored " + Math.round(score) + "! Play again?")) {
    gamePieceOne.x = randomValue(400);
    gamePieceOne.y = randomValue(400);
    gamePieceOne.moveX = 0;
    gamePieceOne.moveY = 0;
    score = 0;
    speed = 1;
  } else {
    window.close();
  }
}

/* Returns randome value from 0 - max */
function randomValue(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

/* Check if inside box */
function isInside() {
  if((gamePieceOne.x > -5) && (gamePieceOne.x < 475) && (gamePieceOne.y > -5) && (gamePieceOne.y < 475)) {
    return true;
  } else {
    return false;
  }
}

/* Create Canvas */
var myCanvas = {
  canvas : document.createElement("canvas"),
  start : function() {
          this.canvas.width = 500;
          this.canvas.height = 500;
          this.context = this.canvas.getContext("2d");
          div = document.querySelector("#canContainer");
          div.appendChild(this.canvas);
          this.interval = setInterval(updateCanvas, 1);
  },
  clear: function() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}

/* Watch for arrow clicks */
document.onkeydown = function(event) {
  switch (event.keyCode) {
    /* Left arrow */
     case 37:
          moveLeft();
        break;
    /* Up arrow */
     case 38:
          moveUp();
        break;
    /* Right arrow */
     case 39:
          moveRight();
        break;
    /* Down arrow */
     case 40:
          moveDown();
        break;
  }
}

/* Create game object */
function gamePiece(width, height, x, y, color) {
  this.width = width;
  this.height = height;
  this.x = x;
  this.y = y;
  this.moveX = 0;
  this.moveY = 0;
  this.update = function() {
    ctx = myCanvas.context;
    ctx.fillStyle = color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
  this.updatePos = function() {
    if(isInside() == true) {
      this.x += this.moveX;
      this.y += this.moveY;
      moveX = 0;
      moveY = 0;
    } else {
      endGame();
    }
  }
}

/* Moving functions */
function moveUp() {
  gamePieceOne.moveY = -speed;
}

function moveDown() {
  gamePieceOne.moveY = speed;
}

function moveLeft() {
  gamePieceOne.moveX = -speed;
}

function moveRight() {
  gamePieceOne.moveX = speed;
}

/* Update the screen */
function updateCanvas() {
  myCanvas.clear();
  gamePieceOne.update();
  gamePieceOne.updatePos();
  if(gamePieceOne.moveX != 0 && gamePieceOne.moveY != 0) {
    score += Math.pow((speed / 10), 2);
    speed += 0.0005;
  }
  scoreBox.innerHTML = "You're Score: " + Math.round(score);
  eHigh.innerHTML = "Easy: " + Math.round(eHighScore);
  mHigh.innerHTML = "Medium: " + Math.round(mHighScore);
  hHigh.innerHTML = "Hard: " + Math.round(hHighScore);
  iHigh.innerHTML = "Impossible: " + Math.round(iHighScore);

}
