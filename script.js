const board = document.querySelector(".board");
let subtext = document.querySelector(".subtext");
loadBoard();
let tiles = [...document.querySelectorAll("[data-status]")];
shuffle(tiles);
let mines = tiles.filter((tile, index) => {
  if (index <= 10) {
    return tile;
  }
});

// FUNCTIONS

function loadBoard() {
  // hidden class
  for (let i = 1; i <= 100; i++) {
    let div = document.createElement("div");
    div.dataset.status = "hidden";
    board.append(div);
  }
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

  tiles.forEach((tile, index) => {
    e.target.dataset.status = "number";

    // if user clicks on mine...
    mines.forEach((mine, index) => {
      if (e.target === mine) {
        mines.forEach((m) => {
          m.dataset.status = "mine";
        });
        subtext.textContent = "You Lose ☠️ ";
      }
    });
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
