const board = document.querySelector(".board");
displayBoard();
const tiles = [...document.querySelectorAll("[data-status]")];
console.log(tiles);

// FUNCTIONS

function displayBoard() {
  for (let i = 1; i <= 100; i++) {
    let div = document.createElement("div");
    div.setAttribute("data-status", "hidden");
    board.append(div);
  }
}

// Fisher-Yates
function shuffle(array) {
  console.log(array);
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
