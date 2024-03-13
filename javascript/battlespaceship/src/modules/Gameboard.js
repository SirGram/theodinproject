/* eslint-disable */
class Gameboard {
  constructor(size = 10) {
    this.size = size;
    this.matrix = Array.from({ length: this.size }, () => Array(this.size).fill(0));
    this.missed = [];
    this.spaceships = [];
    this.hits = [];
  }

  placeSpaceship(spaceship, x, y) {
    const coordinates = [];
    const x1 = x + spaceship.lengthX - 1;
    const y1 = y + spaceship.lengthY - 1;
    if (y1 >= this.size || x < 0 || y < 0 || x1 >= this.size) return;
    for (let i = x; i <= x1; i++) {
      for (let j = y; j <= y1; j++) {
        this.matrix[i][j] = 1;
        coordinates.push([i, j]);
      }
    }
    this.spaceships.push([spaceship, coordinates]);
  }

  receiveAttack(x, y) {
    if (this.matrix[x][y] === 1) {
      const spaceship = this.getSpaceship(x, y);
      spaceship.hit();
      this.hits.push([x, y]);
    } else {
      this.missed.push([x, y]);
    }
  }

  getSpaceship(x, y) {
    let foundSpaceship = null;
    this.spaceships.forEach(([spaceship, coordinates]) => {
      if (coordinates.some(([cx, cy]) => cx === x && cy === y)) {
        foundSpaceship = spaceship;
      }
    });
    return foundSpaceship;
  }

  allSunk() {
    return this.spaceships.every(([spaceship, _]) => spaceship.isSunk());
  }
}

export default Gameboard;
