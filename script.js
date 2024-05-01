const board = document.querySelector(".board");
displayBoard();
let tiles = [...document.querySelectorAll("[data-status]")];
let newTiles = shuffle(tiles);
newBoard(newTiles);

// FUNCTIONS

function displayBoard() {
  // hidden class
  for (let i = 1; i <= 90; i++) {
    let div = document.createElement("div");
    div.setAttribute("data-status", "hidden");
    board.append(div);
  }
  // mine class
  for (let i = 1; i <= 10; i++) {
    let div = document.createElement("div");
    div.setAttribute("data-status", "mine");
    board.append(div);
  }
}

function newBoard(array) {
  return array.map((tile) => {
    board.append(tile);
  });
}
// Fisher-Yates
function shuffle(array) {
  let currentIndex = array.length;
  let temporaryValue, randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

// Left click functionality

// Right click functionality

document.addEventListener("contextmenu", (e) => {
  e.preventDefault();
  if (e.target.matches('[data-status="hidden"]')) {
    e.target.setAttribute("data-status", "marked");
  } else if (e.target.matches('[data-status="marked"')) {
    e.target.setAttribute("data-status", "hidden");
  }
  return false;
});
