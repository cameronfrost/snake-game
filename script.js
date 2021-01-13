const grid = document.querySelector(".grid");
const startButton = document.getElementById("start");
const score = document.getElementById("score");
let squares = [];

function createGrid() {
  for (let i = 0; i < 100; i++) {
    const square = document.createElement("div");
    console.log(square);
    square.classList.add("square");
    grid.appendChild(square);
    squares.push(square);
  }
  console.log(squares);
}
createGrid();

currentSnake.forEach(index => squares[index].classList.add("snake"));

function move() {
  const tail = currentSnake.pop();
  squares[tail].classList.remove("snake");
  currentSnake.unshift(currentSnake[0] + direction);
  squares[currentSnake[0]].classList.add("snake");
}
move();

let timerId = setInterval(move, 1000);

// 39 is right arrow
// 38 is for the up arrow
// 37 is for the left arrow
// 40 is for the down arrow

function control(e) {
  if (e.keyCode === 39) {
    console.log("right pressed");
  } else if (e.keyCode === 38) {
    console.log("up pressed");
  } else if (e.keyCode === 37) {
    console.log("left pressed");
  } else if (e.keyCode === 40) {
    console.log("down pressed");
  }
}
