const gameBoard = () => {
  $squares = document.querySelectorAll(".square");
  $squares.forEach((square) => {
    square.addEventListener("click", function (e) {
      const activePlayer = players.find((player) => player.isActive);
      if (!square.dataset.mark) {
        putMark(square, activePlayer.mark);

        activePlayer.score.push(getSquareIndex(square));
        console.log(activePlayer);
        console.log(checkWin(activePlayer));

        switchTurns();
      }
    });
  });
};
gameBoard();

function getSquareIndex(sq) {
  const squaresArray = Array.from($squares);
  const index = squaresArray.findIndex((square) => square === sq);
  return index;
}

function putMark(sq, sign) {
  const sword = "./src/sword.png";
  const shield = "./src/shield.png";
  sq.dataset.mark = sign;
  if (sign === "X"){

    sq.innerHTML = `<img src="${sword}" alt="${sign}">`;
  }
  else{
    sq.innerHTML = `<img src="${shield}" alt="${sign}">`;}
}

function checkWin(player) {
  for (winningLine of winningLines) {
    if (winningLine.every((value) => player.score.includes(value))) {
      console.log(player.name, "wins");

      return true;
    }
  }
  return false;
}

function switchTurns() {
  for (player of players) {
    player.changeActiveStatus();
  }
}

const playerFactory = (name, mark, isActive) => {
  score = [];
  const changeActiveStatus = function () {
    this.isActive = !this.isActive;
  };
  return { name, mark, score, isActive, changeActiveStatus };
};

const player1 = playerFactory("Player1", "X", true);
const player2 = playerFactory("Player2", "O", false);
const players = [player1, player2];

const winningLines = [
  //x-y
  [0, 1, 2, 3],
  [4, 5, 6, 7],
  [8, 9, 10, 11],
  [12, 13, 14, 15],
  [16, 17, 18, 19],
  [20, 21, 22, 23],
  [24, 25, 26, 27],
  [28, 29, 30, 31],
  [32, 33, 34, 35],
  [36, 37, 38, 39],
  [40, 41, 42, 43],
  [44, 45, 46, 47],
  [48, 49, 50, 51],
  [52, 53, 54, 55],
  [56, 57, 58, 59],
  [60, 61, 62, 63],

  //y-x
  [0, 4, 8, 12],
  [1, 5, 9, 13],
  [2, 6, 10, 14],
  [3, 7, 11, 15],
  [16, 20, 24, 28],
  [17, 21, 25, 29],
  [18, 22, 26, 30],
  [19, 23, 27, 31],
  [32, 36, 40, 44],
  [33, 37, 41, 45],
  [34, 38, 42, 46],
  [35, 39, 43, 47],
  [48, 52, 56, 60],
  [49, 53, 57, 61],
  [50, 54, 58, 62],
  [51, 55, 59, 63],

  //x-z

  [0, 16, 32, 48],
  [1, 17, 33, 49],
  [2, 18, 34, 50],
  [3, 19, 35, 51],
  [4, 20, 36, 52],
  [5, 21, 37, 53],
  [6, 22, 38, 54],
  [7, 23, 39, 55],
  [8, 24, 40, 56],
  [9, 25, 41, 57],
  [10, 26, 42, 58],
  [11, 27, 43, 59],
  [12, 28, 44, 60],
  [13, 29, 45, 61],
  [14, 30, 46, 62],
  [15, 31, 47, 63],
  //diagonals
  [0, 17, 34, 51],
  [4, 21, 38, 55],
  [8, 25, 42, 59],
  [12, 29, 46, 63],

  [3, 18, 33, 48],
  [7, 22, 37, 52],
  [11, 25, 41, 56],
  [15, 29, 45, 60],

  [0, 20, 40, 60],
  [1, 21, 41, 61],
  [2, 22, 42, 62],
  [3, 23, 43, 63],

  [12, 24, 36, 48],
  [13, 25, 37, 49],
  [14, 26, 38, 50],
  [15, 27, 39, 51],

  [0, 5, 10, 15],
  [16, 21, 26, 31],
  [32, 35, 42, 47],
  [48, 51, 58, 63],

  [3, 6, 9, 12],
  [19, 22, 25, 28],
  [35, 38, 41, 44],
  [51, 54, 57, 60],

  //corner to corner
  [0, 21, 42, 63],
  [3, 22, 41, 60],
  [12, 25, 38, 51],
  [15, 26, 37, 48],
];
