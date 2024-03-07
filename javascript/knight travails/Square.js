class Square {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.adjacentList = [];
  }

  addList(x, y) {
    this.adjacentList.push([x, y]);
  }
}
export default Square;
