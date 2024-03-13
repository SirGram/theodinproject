/* eslint-disable */
class Spaceship {
  constructor(data) {
    const { lengthX, lengthY, imgPath } = data;
    this.lengthX = lengthX;
    this.lengthY = lengthY;
    this.hits = 0;
    this.image = imgPath;
  }

  hit() {
    if (this.hits < this.lengthX * this.lengthY) this.hits += 1;
  }

  isSunk() {
    return this.hits === this.lengthX * this.lengthY;
  }
}
export default Spaceship;
