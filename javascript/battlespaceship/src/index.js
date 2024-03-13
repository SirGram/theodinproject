/* eslint-disable */
import Player from './modules/Player.js';
import Gameboard from './modules/Gameboard.js';
import Spaceship from './modules/Spaceship.js';
import Dom from './modules/Dom.js';

const spaceshipType = {
  sentinel: { lengthX: 2, lengthY: 1, imgPath: './src/img/sp5.png' },
  striker: { lengthX: 2, lengthY: 1, imgPath: './src/img/sp4.png' },
  orion: { lengthX: 3, lengthY: 1, imgPath: './src/img/sp1.png' },
  apolo24: { lengthX: 5, lengthY: 1, imgPath: './src/img/sp2.png' },
  starblaze: { lengthX: 3, lengthY: 2, imgPath: './src/img/sp3.png' },
};

const player = new Player('Player 1');
const player2 = new Player('Player 2');
const playerBoard = new Gameboard();
const player2Board = new Gameboard();

// main loop

const sp1 = new Spaceship(spaceshipType['sentinel']);
const sp2 = new Spaceship(spaceshipType['starblaze']);
console.log(sp1);
player2Board.placeSpaceship(sp1, 2, 3);
player2Board.placeSpaceship(sp2, 0, 0);
console.log('player2', player2Board.matrix);
console.log('player2 spaceships', player2Board.spaceships);

const newDom = new Dom();
const $boardgame1 = document.querySelector('#boardgame1');
const $boardgame2 = document.querySelector('#boardgame2');
newDom.displayBoard($boardgame1);
newDom.displayBoard($boardgame2);

$boardgame2.addEventListener('click', (e) => {
  //attacks the other board
  const squareClicked = e.target;
  const x = parseInt(squareClicked.dataset.x);
  const y = parseInt(squareClicked.dataset.y);
  player2Board.receiveAttack(x, y);
  newDom.updateBoard($boardgame2, player2Board);
  console.log(player2Board.spaceships);
});
