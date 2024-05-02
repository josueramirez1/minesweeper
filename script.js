const body = document.querySelector("body");
const board = document.querySelector(".board");
let subtext = document.querySelector(".subtext");
loadBoard();
let tiles = [...document.querySelectorAll("[data-status]")];
shuffle(tiles);
let mines = tiles.filter((tile, index) => {
  if (index < 10) {
    return tile;
  }
});

// FUNCTIONS

function loadBoard() {
  // hidden class
  for (let i = 1; i <= 100; i++) {
    let div = document.createElement("div");
    div.dataset.status = "hidden";
    div.id = i;
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
board.addEventListener("click", (e) => {
  let num = 0;
  if (!e.target.matches("[data-status]")) return;

  tiles.forEach((tile, index) => {
    e.target.dataset.status = "number";

    mines.forEach((mine, i) => {
      if (e.target.nextElementSibling === mine) {
        e.target.dataset.status = "number";
        e.target.textContent = num;
      }
      if (e.target.previousElementSibling === mine) {
        e.target.dataset.status = "number";
        e.target.textContent = num;
      }

      if (e.target === mine) {
        e.target.dataset.status = "mine";
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
