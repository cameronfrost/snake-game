const grid = document.querySelector(".grid");
const startButton = document.getElementById("start");
const scoreDisplay = document.getElementById("score");
let squares = [];
let currentSnake = [2, 1, 0];
let direction = 1;
const width = 10;
let appleIndex = 0;
let score = 0;
let intervalTime = 1000;
let speed = 0.9;
let timerId = 0;

//layout
function createGrid() {
  for (let i = 0; i < width * width; i++) {
    const square = document.createElement("div");
    square.classList.add("square");
    grid.appendChild(square);
    squares.push(square);
  }
}
createGrid();

//snake
currentSnake.forEach(index => squares[index].classList.add("snake"));

function startGame() {
  clearInterval(timerId);
  currentSnake = [2, 1, 0];
  score = 0;
  direction = 1;
  intervalTime = 1000;
  timerId = setInterval(move, intervalTime);
}

function move() {
  if (
    (currentSnake[0] + width >= width * width && direction === width) || //if snake has hit bottom
    (currentSnake[0] % width === width - 1 && direction === 1) || //if snake has hit right wall
    (currentSnake[0] % width === 0 && direction === -1) || //if snake has hit left wall
    (currentSnake[0] - width < 0 && direction === -width) || //if snake has hit top
    squares[currentSnake[0] + direction].classList.contains("snake")
  )
    return clearInterval(timerId);

  const tail = currentSnake.pop();
  squares[tail].classList.remove("snake");
  currentSnake.unshift(currentSnake[0] + direction);

  //apple
  if (squares[currentSnake[0]].classList.contains("apple")) {
    squares[currentSnake[0]].classList.remove("apple");
    squares[tail].classList.add("snake");
    currentSnake.push(tail);

    generateApple();

    //score
    score++;
    scoreDisplay.textContent = score;
  }

  squares[currentSnake[0]].classList.add("snake");
}

//snake speed
clearInterval(timerId);
intervalTime = intervalTime * speed;
timerId = setInterval(move, intervalTime);

function generateApple() {
  do {
    appleIndex = Math.floor(Math.random() * squares.length);
  } while (squares[appleIndex].classList.contains("snake"));
  squares[appleIndex].classList.add("apple");
}
generateApple();

// 39 is right arrow
// 38 is for the up arrow
// 37 is for the left arrow
// 40 is for the down arrow

//controls
function control(e) {
  if (e.keyCode === 39) {
    direction = 1;
  } else if (e.keyCode === 38) {
    direction = -width;
  } else if (e.keyCode === 37) {
    direction = -1;
  } else if (e.keyCode === 40) {
    direction = +width;
  }
}
document.addEventListener("keyup", control);
startButton.addEventListener("click", startGame);
