class Gameboard {
  constructor(size = 10) {
    this.size = size;
    this.matrix = Array.from({ length: this.size }, () =>
      Array(this.size).fill(0)
    );
    this.missed = [];
    this.spaceships = [];
    this.hits = [];

    const spaceshipCoord = (x, y, x1, y1) => {
      const coordinates = [];
      for (let i = x; i <= x1; i++) {
        for (let j = y; j <= y1; j++) {
          this.matrix[i][j] = 1;
          coordinates.push([i, j]);
        }
      }
      return coordinates;
    };
    this.placeSpaceshipRandomly = (spaceship) => {
      const alreadyFit = (coordinates) => {
        return !this.spaceships.some(([_, coords]) =>
          coords.some(([cx, cy]) =>
            coordinates.some(([nx, ny]) => cx === nx && cy === ny)
          )
        );
      };
      const randomValues = () => {
        let x = Math.floor(Math.random() * this.size);
        let y = Math.floor(Math.random() * this.size);
        let x1 = x + spaceship.lengthX - 1;
        let y1 = y + spaceship.lengthY - 1;
        return { x, y, x1, y1 };
      };
      let x, y, x1, y1;
      do {
        ({ x, y, x1, y1 } = randomValues());
      } while (y1 >= this.size || x < 0 || y < 0 || x1 >= this.size);
      const coords = spaceshipCoord(x, y, x1, y1);

      console.log(coords);
      if (!alreadyFit(coords)) {
        this.placeSpaceshipRandomly(spaceship);
      } else {
        this.spaceships.push([spaceship, coords]);
      }
    };

    this.placeSpaceship = (spaceship, x, y) => {
      const x1 = x + spaceship.lengthX - 1;
      const y1 = y + spaceship.lengthY - 1;
      if (y1 >= this.size || x < 0 || y < 0 || x1 >= this.size) return;
      const coordinates = spaceshipCoord(x, y, x1, y1);
      this.spaceships.push([spaceship, coordinates]);
    };
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
