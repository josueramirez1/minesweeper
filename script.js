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
let safeTiles = tiles.filter((tile, index) => {
  if (index >= 10) {
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

// Left click functionality
board.addEventListener("click", (e) => {
  let num = 0;
  let top = topNeighbor(e, tiles);
  let topR = topRightNeighbor(e, tiles);
  let topL = topLeftNeighbor(e, tiles);
  let bottom = bottomNeighbor(e, tiles);
  let bottomR = bottomRightNeighbor(e, tiles);
  let bottomL = bottomLeftNeighbor(e, tiles);
  let safeTop = topNeighbor(e, safeTiles);
  let safeTopR = topRightNeighbor(e, safeTiles);
  let safeTopL = topLeftNeighbor(e, safeTiles);
  let safeBottom = bottomNeighbor(e, safeTiles);
  let safeBottomR = bottomRightNeighbor(e, safeTiles);
  let safeBottomL = bottomLeftNeighbor(e, safeTiles);

  if (!e.target.matches("[data-status]")) return;

  tiles.forEach(() => (e.target.dataset.status = "number"));

  mines.forEach((mine) => {
    if (
      e.target.nextElementSibling === mine ||
      e.target.previousElementSibling === mine ||
      top === mine ||
      topR === mine ||
      topL === mine ||
      bottom === mine ||
      bottomR === mine ||
      bottomL === mine
    ) {
      num++;
      e.target.textContent = num;
    }

    if (e.target === mine) {
      e.target.dataset.status = "mine";
      e.target.textContent = "";
      mines.forEach((m) => {
        m.dataset.status = "mine";
      });
      subtext.textContent = "You Lose ☠️ ";
    }
  });

  safeTiles.forEach((safe) => {
    if (e.target.nextElementSibling === safe) {
      e.target.nextElementSibling.dataset.status = "number";
    }
    if (e.target.previousElementSibling === safe) {
      e.target.previousElementSibling.dataset.status = "number";
    }
    if (safeTop === safe) {
      safeTop.dataset.status = "number";
    }
    if (safeTopR === safe) {
      safeTopR.dataset.status = "number";
    }
    if (safeTopL === safe) {
      safeTopL.dataset.status = "number";
    }
    if (safeBottom === safe) {
      safeBottom.dataset.status = "number";
    }
    if (safeBottomL === safe) {
      safeBottomL.dataset.status = "number";
    }
    if (safeBottomR === safe) {
      safeBottomR.dataset.status = "number";
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
