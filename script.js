const c = document.getElementById("mainWindow");
const ctx = c.getContext("2d");
let score = 0;

if (localStorage.highScore == undefined) {
  localStorage.setItem("highScore", 0);
}

// Main game loop

function render() {
  // Updates score in UI

  document.getElementById("myScore").innerHTML = score;
  document.getElementById("highScore").innerHTML = localStorage.highScore;

  // Updates highscore

  if (score > localStorage.highScore) {
    localStorage.highScore = score;
  }

  // Initial draw

  drawSnake();
  drawGrid();
  drawFood();

  // Snake movement

  if (snakeDirection == 0) {
    yPos -= gridSize;
  } else if (snakeDirection == 1) {
    yPos += gridSize;
  } else if (snakeDirection == 2) {
    xPos -= gridSize;
  } else if (snakeDirection == 3) {
    xPos += gridSize;
  }

  // Detects if snake eats food

  if (xPos == foodX && yPos == foodY) {
    foodX = Math.floor(Math.random() * gridMaxX) * gridSize;
    foodY = Math.floor(Math.random() * gridMaxY) * gridSize;
    snakeLength++;
    score++;
  }

  // Checks if snake head is colliding with body

  for (let i = 0; i < snakeBody.length; i++) {
    if (xPos == snakeBody[i][0] && yPos == snakeBody[i][1]) {
      resetGame();
    } else {
    }
  }

  // Sets the speed of game

  setTimeout(() => {
    requestAnimationFrame(render);
  }, 75);
}

requestAnimationFrame(render);

// Grid generation

const gridSize = 25;
const maxX = 700;
const minX = 0;
const maxY = 700;
const minY = 0;
const gridMaxY = maxY / gridSize;
const gridMaxX = maxX / gridSize;

function drawGrid() {
  // Grid line color

  ctx.fillStyle = "rgb(35,35,35)";

  // All vertical lines

  for (let i = gridSize; i < maxX; i += gridSize) {
    ctx.fillRect(i, 0, 1, maxY);
  }

  // All horiziontal lines

  for (let i = gridSize; i < maxY; i += gridSize) {
    ctx.fillRect(0, i, maxX, 1);
  }
}

// Snake and food generation

let xPos = 400;
let yPos = 300;
let snakeBody = [];
let snakeLength = 3;
let foodX = Math.floor(Math.random() * gridMaxX) * gridSize;
let foodY = Math.floor(Math.random() * gridMaxY) * gridSize;
let snakeDirection = 0;

// Generates snake

function drawSnake() {
  if (xPos < maxX && yPos < maxY && xPos >= 0 && yPos >= 0) {
    snakeBody.push([xPos, yPos]);
    ctx.fillStyle = "rgb(0,127,92)";
    ctx.fillRect(xPos, yPos, gridSize, gridSize);
    if (snakeBody.length > snakeLength) {
      var itemToRemove = snakeBody.shift();
      ctx.clearRect(itemToRemove[0], itemToRemove[1], gridSize, gridSize);
    }
  } else {
    resetGame();
  }
}

// Generates food

function drawFood() {
  ctx.fillStyle = "#FDCA40";
  ctx.fillRect(foodX, foodY, gridSize, gridSize);
  ctx.strokeRect(foodX, foodY, gridSize, gridSize);
}

// Keyboard input scripts

document.addEventListener("keydown", (key) => {
  // Arrow key up input
  if (key.keyCode == 38 && snakeDirection != 1) {
    snakeDirection = 0;
    // Arrow key down input
  } else if (key.keyCode == 40 && snakeDirection != 0) {
    snakeDirection = 1;
    // Arrow key left input
  } else if (key.keyCode == 37 && snakeDirection != 3) {
    snakeDirection = 2;
    // Arrow key right input
  } else if (key.keyCode == 39 && snakeDirection != 2) {
    snakeDirection = 3;
  }
});

// Resets game

function resetGame() {
  ctx.clearRect(0, 0, 700, 700);
  foodX = Math.floor(Math.random() * gridMaxX) * gridSize;
  foodY = Math.floor(Math.random() * gridMaxY) * gridSize;
  xPos = 400;
  yPos = 300;
  snakeLength = 3;
  snakeBody = [];
  score = 0;
  drawFood();
}

// Mobile swipe recognition

document.addEventListener("touchstart", handleTouchStart, false);
document.addEventListener("touchmove", handleTouchMove, false);

let xDown = null;
let yDown = null;

function getTouches(evt) {
  return evt.touches || evt.originalEvent.touches;
}

function handleTouchStart(evt) {
  const firstTouch = getTouches(evt)[0];
  xDown = firstTouch.clientX;
  yDown = firstTouch.clientY;
}

function handleTouchMove(evt) {
  if (!xDown || !yDown) {
    return;
  }

  const xUp = evt.touches[0].clientX;
  const yUp = evt.touches[0].clientY;

  const xDiff = xDown - xUp;
  const yDiff = yDown - yUp;

  // Mobile input script

  if (Math.abs(xDiff) > Math.abs(yDiff)) {
    if (xDiff < 0 && snakeDirection != 2) {
      snakeDirection = 3;
    } else if (xDiff > 0 && snakeDirection != 3) {
      snakeDirection = 2;
    }
  } else {
    if (yDiff < 0 && snakeDirection != 0) {
      snakeDirection = 1;
    } else if (yDiff > 0 && snakeDirection != 1) {
      snakeDirection = 0;
    }
  }

  xDown = null;
  yDown = null;
}
