class Player {
  constructor(name, turn = false) {
    this.name = name;
    this.turn = turn;
  }

  attack(gameBoard, x, y) {
    console.log(x, y);
    gameBoard.receiveAttack(x, y);
  }

  randomAttack(gameBoard) {
    // AI attack
    const x = Math.floor(Math.random() * gameBoard.size);
    const y = Math.floor(Math.random() * gameBoard.size);
    gameBoard.receiveAttack(x, y);
  }
}

export default Player;
