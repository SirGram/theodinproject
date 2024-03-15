
class Player {
  constructor(name, turn = false) {
    this.name = name;
    this.turn = turn;
  }

  attack(gameBoard, x, y) {
    console.log(x, y);
    return gameBoard.receiveAttack(x, y);
  }

  randomAttack(gameBoard) {
    const coordinates = [...gameBoard.hits, ...gameBoard.missed];  
    console.log(coordinates)  
    let x, y;
    do {
      x = Math.floor(Math.random() * gameBoard.size);
      y = Math.floor(Math.random() * gameBoard.size);
    } while (coordinates.some(coord => coord.x === x && coord.y === y));
    console.log(x,y)
    return gameBoard.receiveAttack(x, y);
  }
}

export default Player;
