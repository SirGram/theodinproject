class Gameboard {
  constructor(size = 10) {
    this.size = size;
    this.matrix = Array.from({ length: this.size }, () =>
      Array(this.size).fill(0)
    );
    this.missed = [];
    this.spaceships = [];
  }

  placeSpaceship(spaceship, x, y) {
    const coordinates = [];
    const y1 = y + spaceship.length - 1;
    if (y1 >= this.size || x < 0 || y < 0 || y1 < 0) return;
    for (let j = y; j <= y1; j++) {
      this.matrix[x][j] = 1;
      coordinates.push([x, j]);
    }
    this.spaceships.push([spaceship, coordinates]);
  }

  receiveAttack(x, y) {
    if (this.matrix[x][y] === 1) {
      const spaceship = this.getSpaceship(x, y);
      spaceship.hit();
    } else {
      console.log(x, y);
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
