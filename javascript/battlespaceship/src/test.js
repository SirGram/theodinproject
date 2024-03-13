/* eslint-disable */
import Spaceship from './modules/Spaceship.js';
import Gameboard from './modules/Gameboard.js';

// Spaceship
test('add 1 hit to spaceship', () => {
  const spaceship1 = new Spaceship(4);
  spaceship1.hit();
  expect(spaceship1.hits).toBe(1);
});
test('sinks spaceship', () => {
  const spaceship2 = new Spaceship(3);
  spaceship2.hit();
  spaceship2.hit();
  spaceship2.hit();
  spaceship2.hit();
  spaceship2.hit();
  expect(spaceship2.hits).toBe(3);
  expect(spaceship2.isSunk()).toBe(true);
});
// Gameboard
test('position spaceship on matrix', () => {
  const spaceship3 = new Spaceship(2);
  const game = new Gameboard(2);
  game.placeSpaceship(spaceship3, 1, 0);
  console.log('matrix ', game.matrix);
  expect(game.matrix).toEqual([
    [0, 0],
    [1, 1],
  ]);
});
test('position spaceship outside matrix', () => {
  const spaceship3 = new Spaceship(2);
  const game = new Gameboard(2);
  game.placeSpaceship(spaceship3, 0, 1);
  expect(game.matrix).toEqual([
    [0, 0],
    [0, 0],
  ]);
});
test('spaceship receives attack in Gameboard', () => {
  const spaceship3 = new Spaceship(3);
  const game = new Gameboard(3);
  game.placeSpaceship(spaceship3, 2, 0);
  game.receiveAttack(2, 1);
  expect(spaceship3.hits).toBe(1);
});
test('gameboard has 2 missed attack', () => {
  const spaceship3 = new Spaceship(3);
  const game = new Gameboard(3);
  game.placeSpaceship(spaceship3, 2, 0);
  game.receiveAttack(2, 1);
  game.receiveAttack(1, 1);
  game.receiveAttack(0, 2);
  console.log('missed ', game.missed);
  expect(game.missed.length).toBe(2);
});
test('all 2 spaceships are sunk', () => {
  const spaceship1 = new Spaceship(3);
  const spaceship2 = new Spaceship(2);
  const game = new Gameboard();
  game.placeSpaceship(spaceship1, 0, 0);
  game.placeSpaceship(spaceship2, 1, 0);
  game.receiveAttack(0, 0);
  game.receiveAttack(0, 1);
  game.receiveAttack(0, 2);
  game.receiveAttack(1, 0);
  game.receiveAttack(1, 1);
  expect(game.allSunk()).toBe(true);
});
// Player
