
const Gameboard = () => {
  
    $squares = document.querySelectorAll(".square");
  $squares.forEach((square) => {
    square.addEventListener("click", function (e) {
      player1.score.push(getSquareIndex(square));
      console.log(player1);
      console.log(checkWin(player1.score));
    });
  });

  function getSquareIndex(sq) {
    const squaresArray = Array.from($squares);
    const index = squaresArray.findIndex((square) => square === sq);
    return index;
  }

  function putMark(sq, sign) {
    sq.dataset.mark = sign;
  }

 

  const playerFactory = (name, mark, isActive) => {
    score = [];
    const changeActiveStatus = (this.isActive = !this.isActive);
    return { name, mark, score, isActive, changeActiveStatus };
  };
  const player1 = playerFactory("Player1", "X", true);
  const player2 = playerFactory("Player2", "O", false);


  const winningLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],  ];

  function checkWin(array) {
    for (winningLine of winningLines) {
      if (winningLine.every((value) => array.includes(value))) return true;
    }
    return false;
  }
};
