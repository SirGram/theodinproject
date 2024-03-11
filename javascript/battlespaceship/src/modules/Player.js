class Player {
  constructor(name) {
    this.name = name;
  }
  attack(gameBoard, x, y) {
    console.log(x, y);
    gameBoard.receiveAttack(x, y);
  }
  randomAttack(gameBoard) {
    //AI attack
    const x = Math.floor(Math.random() * gameBoard.size);
    const y = Math.floor(Math.random() * gameBoard.size);
    enemyGameboard.receiveAttack(x, y);
  }
}

export default Player;
