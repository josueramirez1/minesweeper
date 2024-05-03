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

function topNeighbor(e, array) {
  let topTile = e.target.id - 10;
  let tile = array.find((t) => {
    let numT = parseInt(t.id);
    if (numT === topTile) {
      return t;
    }
  });

  return tile;
}

function topRightNeighbor(e, array) {
  let topRightTile = e.target.id - 9;
  let tile = array.find((t) => {
    let numT = parseInt(t.id);
    if (numT === topRightTile) {
      return t;
    }
  });
  return tile;
}
function topLeftNeighbor(e, array) {
  let topLeftTile = e.target.id - 11;
  let tile = array.find((t) => {
    let numT = parseInt(t.id);
    if (numT === topLeftTile) {
      return t;
    }
  });
  return tile;
}
function bottomNeighbor(e, array) {
  let bottomTile = parseInt(e.target.id) + 10;
  let tile = array.find((t) => {
    let numT = parseInt(t.id);
    if (numT === bottomTile) {
      return t;
    }
  });
  return tile;
}
function bottomRightNeighbor(e, array) {
  let bottomRightTile = parseInt(e.target.id) + 11;
  let tile = array.find((t) => {
    let numT = parseInt(t.id);
    if (numT === bottomRightTile) {
      return t;
    }
  });
  return tile;
}
function bottomLeftNeighbor(e, array) {
  let bottomLeftTile = parseInt(e.target.id) + 9;
  let tile = array.find((t) => {
    let numT = parseInt(t.id);
    if (numT === bottomLeftTile) {
      return t;
    }
  });
  return tile;
}

function recursiveSpace(e, mine) {}

// Left click functionality
board.addEventListener("click", (e) => {
  let num = 0;
  let top = topNeighbor(e, tiles);
  let topR = topRightNeighbor(e, tiles);
  let topL = topLeftNeighbor(e, tiles);
  let bottom = bottomNeighbor(e, tiles);
  let bottomR = bottomRightNeighbor(e, tiles);
  let bottomL = bottomLeftNeighbor(e, tiles);

  if (!e.target.matches("[data-status]")) return;

  tiles.forEach((tile) => {
    e.target.dataset.status = "number";
  });

  mines.forEach((mine) => {
    if (e.target.nextElementSibling === mine) {
      num++;
      e.target.textContent = num;
    }
    if (e.target.previousElementSibling === mine) {
      num++;
      e.target.textContent = num;
    }
    if (top === mine) {
      num++;
      e.target.textContent = num;
    }
    if (topR === mine) {
      num++;
      e.target.textContent = num;
    }
    if (topL === mine) {
      num++;
      e.target.textContent = num;
    }
    if (bottom === mine) {
      num++;
      e.target.textContent = num;
    }
    if (bottomR === mine) {
      num++;
      e.target.textContent = num;
    }
    if (bottomL === mine) {
      num++;
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
