const body = document.querySelector("body");
const board = document.querySelector(".board");
let subtext = document.querySelector(".subtext");
const width = 10;
const bombAmount = 10;
let squares = [];

// shuffle(tiles);

// FUNCTIONS
let rightClick = 10;
function loadBoard() {
  const bombArray = Array(width).fill("bomb");
  const emptyArray = Array(width * width - bombAmount).fill("valid");
  const gameArray = emptyArray.concat(bombArray);
  const shuffledArray = gameArray.sort(() => Math.random() - 0.5);

  for (let i = 0; i < width * width; i++) {
    let square = document.createElement("div");
    square.dataset.status = "hidden";
    square.id = i;
    square.classList.add(shuffledArray[i]);
    squares.push(square);
    board.append(square);

    square.addEventListener("click", (e) => {
      click(square);
    });

    // Right click functionality

    square.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      if (e.target.matches('[data-status="hidden"]')) {
        e.target.dataset.status = "marked";
        subtext.textContent = `Mines Left: ${--rightClick}`;
      } else if (e.target.matches('[data-status="marked"')) {
        e.target.dataset.status = "hidden";
        subtext.textContent = `Mines Left: ${++rightClick}`;
      }
      return false;
    });
  }

  for (let i = 0; i < squares.length; i++) {
    let total = 0;
    const leftSide = i % width === 0;
    const rightSide = i % width === width - 1;

    if (squares[i].classList.contains("valid")) {
      if (i > 0 && !leftSide && squares[i - 1].classList.contains("bomb"))
        total++;
      if (
        i > 9 &&
        !rightSide &&
        squares[i + 1 - width].classList.contains("bomb")
      )
        total++;
      if (i > 10 && squares[i - width].classList.contains("bomb")) total++;
      if (
        i > 11 &&
        !leftSide &&
        squares[i - width - 1].classList.contains("bomb")
      )
        total++;
      if (i < 99 && !rightSide && squares[i + 1].classList.contains("bomb"))
        total++;
      if (
        i < 90 &&
        !leftSide &&
        squares[i - 1 + width].classList.contains("bomb")
      )
        total++;
      if (
        i < 88 &&
        !rightSide &&
        squares[i + 1 + width].classList.contains("bomb")
      )
        total++;
      if (i < 89 && squares[i + width].classList.contains("bomb")) total++;
      squares[i].setAttribute("data", total);
    }
  }
}

loadBoard();

function click(square) {
  console.log(square);
  if (
    square.matches('[data-status="number') ||
    square.matches('[data-status="marked"') ||
    square.classList.contains("checked")
  ) {
    return;
  }

  if (square.classList.contains("bomb")) {
    gameOver();
  } else {
    let total = square.getAttribute("data");
    if (total != 0) {
      square.classList.add("checked");
      if (total === 1) square.classList.add("one");
      if (total === 2) square.classList.add("two");
      if (total === 3) square.classList.add("three");
      if (total === 4) square.classList.add("four");
      square.textContent = total;
    }
    // checkSquare(square);
  }
  square.dataset.status = "number";
  square.classList.add("checked");
}

function gameOver() {
  subtext.textContent = "BOOM! Game Over";

  squares.forEach((s) => {
    if (s.classList.contains("bomb")) {
      s.dataset.status = "mine";
      s.textContent = "💣";
      s.classList.remove("bomb");
      s.classList.add("checked");
    }
  });
}

function checkSquare(square) {
  const currentId = square.id;

  setTimeout(function () {
    if (currentId > 0) {
      const newId = parseInt(currentId) - 1;
      const newSquare = document.getElementById(newId);
      click(newSquare);
    }
    if (currentId > 9) {
      const newId = parseInt(currentId) + 1 - width;
      const newSquare = document.getElementById(newId);
      click(newSquare);
    }
    if (currentId > 10) {
      const newId = parseInt(currentId) - width;
      const newSquare = document.getElementById(newId);
      click(newSquare);
    }
    if (currentId > 11) {
      const newId = parseInt(currentId) - 1 - width;
      const newSquare = document.getElementById(newId);
      click(newSquare);
    }
    if (currentId < 98) {
      const newId = parseInt(currentId) - width;
      const newSquare = document.getElementById(newId);
      click(newSquare);
    }
    if (currentId < 90) {
      const newId = parseInt(currentId) - 1 + width;
      const newSquare = document.getElementById(newId);
      click(newSquare);
    }
    if (currentId < 88) {
      const newId = parseInt(currentId) + 1 + width;
      const newSquare = document.getElementById(newId);
      click(newSquare);
    }
    if (currentId < 89) {
      const newId = parseInt(currentId) + width;
      const newSquare = document.getElementById(newId);
      click(newSquare);
    }
  }, 10);
}
