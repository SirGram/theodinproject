class Dom {
  constructor() {}

  displayBoard(boardDiv, gameBoard, size = 10) {
    // make squares
    for (let x = 0; x < size; x++) {
      for (let y = 0; y < size; y++) {
        const square = document.createElement("div");
        square.classList.add("square");
        square.dataset.x = x;
        square.dataset.y = y;
        boardDiv.appendChild(square);
      }
    }
    // place ships
    gameBoard.spaceships.forEach(([spaceship, coords]) => {
      if (spaceship) {
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
        const imageDiv = document.createElement("div");
        imageDiv.classList.add("spaceship");
        imageDiv.classList.add(`${spaceship.name}`);
        imageDiv.style.gridArea = `${minX + 1} / ${minY + 1} / ${maxX + 2} / ${
          maxY + 2
        }`;
        imageDiv.style.backgroundImage = `url(${spaceship.image})`;
        imageDiv.style.backgroundSize = "cover";
        boardDiv.appendChild(imageDiv);
      }
    });
  }

  updateBoard(boardDiv, gameBoard) {
    // orange bg for misses
    gameBoard.missed.forEach(([x, y]) => {
      const missedSquare = boardDiv.querySelector(
        `[data-x="${x}"][data-y="${y}"]`
      );
      if (missedSquare.childElementCount === 0) {
        const circleDiv = document.createElement("div");
        circleDiv.classList.add("missed");
        missedSquare.appendChild(circleDiv);
      }
    });
    // red bg for hits
    gameBoard.hits.forEach(([x, y]) => {
      const square = boardDiv.querySelector(`[data-x="${x}"][data-y="${y}"]`);
      if (square.childElementCount === 0){ const circleDiv = document.createElement("div");
        circleDiv.classList.add("hit");
        square.appendChild(circleDiv);}
    });
    // unveil sunken ship
    gameBoard.spaceships.forEach(([spaceship]) => {
      const imageDiv = document.querySelector(`.${spaceship.name}`);
      if (spaceship.isSunk()) {
        console.log("spaceship sunk");
        setTimeout(() => {
          imageDiv.classList.add("sunk");
        }, 0.5);
      }
    });
  }
}

export default Dom;
