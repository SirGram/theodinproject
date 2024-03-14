/* eslint-disable */
import Player from "./modules/Player.js";
import Gameboard from "./modules/Gameboard.js";
import Spaceship from "./modules/Spaceship.js";
import Dom from "./modules/Dom.js";
import playBackgroundMusic from "./Music.js";


const $gameMode = document.getElementById("game-mode");
const $gameModeButton1 = document.getElementById("mode1");
const $gameModeButton2 = document.getElementById("mode2");
let gameMode;
let gameOver = false;
const spaceshipType = {
  sentinel: {
    name: "sentinel",
    lengthX: 2,
    lengthY: 1,
    imgPath: "./src/img/sp5.png",
  },
  striker: {
    name: "striker",
    lengthX: 2,
    lengthY: 1,
    imgPath: "./src/img/sp4.png",
  },
  orion: {
    name: "orion",
    lengthX: 3,
    lengthY: 1,
    imgPath: "./src/img/sp1.png",
  },
  apolo24: {
    name: "apolo24",
    lengthX: 5,
    lengthY: 1,
    imgPath: "./src/img/sp2.png",
  },
  starblaze: {
    name: "starblaze",
    lengthX: 3,
    lengthY: 2,
    imgPath: "./src/img/sp3.png",
  },
};

const placeRandomly = (playerBoard) => {
  Object.keys(spaceshipType).forEach((spaceship) => {
    const spaceshipName = spaceshipType[spaceship];
    const newSpaceship = new Spaceship(spaceshipName);
    playerBoard.placeSpaceshipRandomly(newSpaceship);
  });
};
// set board
const initializeGame = (mode) => {
  gameMode = mode;
  playBackgroundMusic();
  const newDom = new Dom();
  const $boardgame = document.querySelector("#boardgame1");
  const $boardgame2 = document.querySelector("#boardgame2");
  $boardgame.style.opacity = 1
  $boardgame2.style.opacity = 1
  $gameMode.style.display = 'none'
  const player = new Player("Player 1", true);
  const player2 = new Player("Player 2");
  const playerBoard = new Gameboard();
  const player2Board = new Gameboard();
  // place ships randomly
  placeRandomly(player2Board);
  placeRandomly(playerBoard);
  console.log(playerBoard.spaceships);
  console.log(player2Board.spaceships);
  newDom.displayBoard($boardgame, playerBoard);
  newDom.displayBoard($boardgame2, player2Board);
  boardListeners();
  return {
    newDom,
    $boardgame,
    $boardgame2,
    player,
    player2,
    playerBoard,
    player2Board,
  };
};
let newDom, $boardgame, $boardgame2, player, player2, playerBoard, player2Board;

$gameModeButton1.addEventListener("click", () => {
  ({
    newDom,
    $boardgame,
    $boardgame2,
    player,
    player2,
    playerBoard,
    player2Board,
  } = initializeGame("normal"));
});
$gameModeButton2.addEventListener("click", () => {
  ({
    newDom,
    $boardgame,
    $boardgame2,
    player,
    player2,
    playerBoard,
    player2Board,
  } = initializeGame("ai"));
});

const toggleTurn = () => {
  player.turn = !player.turn;
  player2.turn = !player2.turn;
};

const playerTurn = (e, player, playerBoard, boardGame, mode = "normal") => {
  const findClickedSquare = () => {
    const squareClicked = e.target;
    const x = parseInt(squareClicked.dataset.x);
    const y = parseInt(squareClicked.dataset.y);
    return { x, y };
  };
  //attacks the other board
  if (!player.turn) return;
  toggleTurn();
  if (mode !== "ai") {
    const { x, y } = findClickedSquare();
    player.attack(playerBoard, x, y);
  } else {
    console.log("rando");
    player.randomAttack(playerBoard);
  }
  newDom.updateBoard(boardGame, playerBoard);

  // check game state
  gameOver = playerBoard.allSunk();
  console.log("game over", gameOver);
};

// board clicks
const boardListeners = () => {
  $boardgame2.addEventListener("click", (e) => {
    if (!gameOver) {
      playerTurn(e, player, player2Board, $boardgame2);
      // ai attack
      if (gameMode === "ai") {
        setTimeout(() => {
          playerTurn(e, player2, playerBoard, $boardgame, gameMode);
        }, 1000);
      }
    }
  });
  // normal mode
  $boardgame.addEventListener("click", (e) => {
    if (!gameOver && gameMode !== "ai") {
      playerTurn(e, player2, playerBoard, $boardgame);
    }
  });
};
