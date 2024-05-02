const board = document.querySelector(".board");
let subtext = document.querySelector(".subtext");
displayBoard();
let tiles = [...document.querySelectorAll("[data-status]")];
let newTiles = shuffle(tiles);
let mines = newTiles.filter((tile, index) => {
  if (index <= 10) {
    return tile;
  }
});

// FUNCTIONS

function displayBoard() {
  // hidden class
  for (let i = 1; i <= 100; i++) {
    let div = document.createElement("div");
    div.setAttribute("data-status", "hidden");
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
document.addEventListener("click", (e) => {
  if (!e.target.matches("[data-status]")) return;
  // if user clicks on non-mine...
  console.dir(e.target);
  newTiles.forEach((tile) => {
    e.target.dataset.status = "number";
  });

  // if user clicks on mine...
  mines.forEach((mine) => {
    if (e.target === mine) {
      mines.forEach((m) => {
        m.dataset.status = "mine";
      });
      subtext.textContent = "You Lose ☹️ ";
    }
  });
});

// Right click functionality
let count = 10;
document.addEventListener("contextmenu", (e) => {
  e.preventDefault();
  if (e.target.matches('[data-status="hidden"]')) {
    e.target.dataset.status = "marked";
    subtext.textContent = `Mines Left: ${--count}`;
  } else if (e.target.matches('[data-status="marked"')) {
    e.target.dataset.status = "hidden";
    subtext.textContent = `Mines Left: ${++count}`;
  }
  return false;
});
