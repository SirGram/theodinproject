const homeScreen = (() => {
  let players;
  let game;
  $homeScreen = document.querySelector("#homescreen");
  $player1Input = document.querySelector("#player1-color");
  $player2Input = document.querySelector("#player2-color");
  $player1Input.value = "#6495ED";
  $player2Input.value = "#e66465";

  $startButton = document.querySelector("#start");

  $startButton.addEventListener("click", function () {
    const player1Character = $homeScreen.querySelector(
      "input[name=image]:checked"
    );
    const player2Character = $homeScreen.querySelector(
      "input[name=image2]:checked"
    );
    const player1color = $player1Input.value;
    const player2color = $player2Input.value;

    $homeScreen.style.display = "none";
    players = playerController(
      player1color,
      player2color,
      player1Character.value,
      player2Character.value
    );
    game = gameBoard(players);
    game.showBoard(1);
    buttonController(game);
  });
})();

const playerController = (color1, color2, character1, character2) => {
  const playerFactory = (name, mark, isActive, color, character) => {
    let wonMatches = 0;
    const winMatch = function () {
      this.wonMatches++;
    };
    const score = [];
    const changeActiveStatus = function () {
      this.isActive = !this.isActive;
    };

    return {
      name,
      mark,
      score,
      isActive,
      changeActiveStatus,
      wonMatches,
      winMatch,
      color,
      character,
    };
  };

  const player1 = playerFactory("Player1", "X", true, color1, character1);
  const player2 = playerFactory("Player2", "O", false, color2, character2);
  const players = [player1, player2];

  return players;
};

const gameBoard = (players) => {
  console.log(players);
  let isOver = false;
  $board = document.querySelector("#board-container");
  $board.style.display = "flex";

  showBoard(1);

  $message = document.querySelector("#message");
  $message.style.borderTopLeftRadius = "10px";
  $message.style.borderTopRightRadius = "10px";

  $homeButton = document.querySelector("#home");
  $resetButton = document.querySelector("#reset");
  $score = document.querySelector("#score");
  $score.style.display = "flex";
  $squares = document.querySelectorAll(".square");
  $resetButton.addEventListener("click", () =>
    resetBoard(true, "Player1's turn")
  );
  $homeButton.addEventListener("click", () => location.reload());
  let activePlayer = findActivePlayer(players);
  resetBoard(false, "Player1's turn");
  $squares.forEach((square, index) => {
    const characterImage = document.createElement("img");
    square.appendChild(characterImage);
    // chessboard pattern
    const row = Math.floor(index / 4);
    const col = index % 4;
    square.style.backgroundColor =
      (row + col) % 2 === 0 ? "rgb(240,240,240)" : "rgba(125, 125, 232,0.1)";

    square.addEventListener("click", function () {
      console.log(activePlayer.mark);

      if (!square.dataset.mark && !isOver) {
        putMark(square, characterImage, activePlayer.mark, activePlayer);

        activePlayer.score.push(getSquareIndex(square));

        console.log(activePlayer);
        isOver = checkWin(activePlayer);

        if (!isOver) {
          switchTurns();
          activePlayer = findActivePlayer(players);
          $message.innerHTML = `${activePlayer.name}'s turn`;
        } else {
          activePlayer = findActivePlayer(players);
          $message.innerHTML = `${activePlayer.name} wins!`;

          activePlayer.winMatch();
          switchTurns();

          activePlayer = findActivePlayer(players);
          setTimeout(
            () => resetBoard(false, `${activePlayer.name}'s turn`),
            1000
          );
        }
      }
    });
  });

  function findActivePlayer(players) {
    let activePlayer = players.find((player) => player.isActive == true);
    return activePlayer;
  }

  function resetBoard(completeReset, message) {
    $squares.forEach((square) => {
      currentCharacterImage = square.querySelector("img");
      if (currentCharacterImage) {
        currentCharacterImage.removeAttribute("src");
      }
      square.style.border = "";

      square.removeAttribute("data-mark");
    });
    for (player of players) {
      player.score = [];
      if (completeReset) {
        player.wonMatches = 0;
      }
    }

    $message.innerHTML = message;

    $score.innerHTML = `<img src="${players[0].character}">${players[0].wonMatches} - ${players[1].wonMatches}<img src="${players[1].character}">`;

    isOver = false;
  }

  function showBoard(boardNumber) {
    for (let i = 1; i < 5; i++) {
      const board = document.getElementById(`board-${i}`);
      board.style.display = i === boardNumber ? "" : "none";
      board.style.pointerEvents = i === boardNumber ? "auto" : "none";
    }
  }

  function getSquareIndex(sq) {
    const squaresArray = Array.from($squares);
    const index = squaresArray.findIndex((square) => square === sq);
    return index;
  }

  const putMark = function (sq, characterImage, sign, activePlayer) {
    sq.dataset.mark = sign;
    console.log(activePlayer.character);
    characterImage.src = activePlayer.character;
    sq.style.border = `solid 2px ${activePlayer.color}`;
  };

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

  return { showBoard };
};

const buttonController = (game) => {
  buttonSlider = document.querySelector("#btn-slider");
  buttons = Array.from(buttonSlider.children);
  console.log(buttons);

  buttons[0].style.backgroundColor = "var(--slider)";

  buttons.forEach((button, index) => {
    button.addEventListener("click", function () {
      buttons.forEach((btn) => {
        btn.style.backgroundColor = "";
      });
      game.showBoard(index + 1);
      button.style.backgroundColor = "var(--slider)";
    });
  });
};

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
