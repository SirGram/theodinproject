/* eslint-disable */
class Dom {
  displayBoard(boardDiv, size = 10) {
    boardDiv.innerHTML = '';
    for (let x = 0; x < size; x++) {
      for (let y = 0; y < size; y++) {
        const square = document.createElement('div');
        square.classList.add('square');
        square.dataset.x = x;
        square.dataset.y = y;
        boardDiv.appendChild(square);
      }
    }
  }
  updateBoard(boardDiv, gameBoard) {
    this.displayBoard(boardDiv);
    //orange bg for misses
    gameBoard.missed.forEach(([x, y]) => {
      const missedSquare = boardDiv.querySelector(`[data-x="${x}"][data-y="${y}"]`);
      if (missedSquare) missedSquare.classList.add('missed');
    });
    // red bg for hits
    gameBoard.hits.forEach(([x, y]) => {
      const square = boardDiv.querySelector(`[data-x="${x}"][data-y="${y}"]`);
      if (square) square.classList.add('hit');
    });
    //unveil sunken ship
    gameBoard.spaceships.forEach(([spaceship, coords]) => {
      if (spaceship) {
        console.log('spaceship sunk');
        let minX = Infinity;
        let maxX = -Infinity;
        let minY = Infinity;
        let maxY = -Infinity;
        coords.forEach(([x, y]) => {
          minX = Math.min(minX, x);
          maxX = Math.max(maxX, x);
          minY = Math.min(minY, y);
          maxY = Math.max(maxY, y);
        });
        const imageDiv = document.createElement('div');
        imageDiv.classList.add('spaceship');
        imageDiv.style.gridArea = `${minX + 1} / ${minY + 1} / ${maxX + 2} / ${maxY + 2}`;
        imageDiv.style.backgroundImage = `url(${spaceship.image})`;
        imageDiv.style.backgroundSize = 'cover';
        boardDiv.appendChild(imageDiv);
        if (spaceship.isSunk()) {
          imageDiv.style.opacity = '0.5';
        }
      }
    });
  }
}

export default Dom;
