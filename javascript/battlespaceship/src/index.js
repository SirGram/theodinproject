import Player from "./modules/Player.js";
import Gameboard from "./modules/Gameboard.js";
import Spaceship from "./modules/Spaceship.js";

const player = new Player("Player 1");
const player2 = new Player("Player 2");
const playerBoard = new Gameboard();
const player2Board = new Gameboard();

// main loop

console.log("player", playerBoard.matrix);
const sp1 = new Spaceship(2);
playerBoard.placeSpaceship(sp1, 2, 3);
console.log("player", playerBoard.matrix);
player2.attack(playerBoard, 2, 4);

console.log("player", playerBoard.matrix);
console.log("misses", playerBoard.missed);
