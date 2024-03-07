import Square from './Square.js';

const $board = document.querySelector('#board');
const $message = document.querySelector('#message');
const $tooltip = document.querySelector('#tooltip');
const board = [];
const BOARDSIZE = 8;

// Create board square coordinates and board divs
for (let i = 0; i < BOARDSIZE; i += 1) {
  for (let j = 0; j < BOARDSIZE; j += 1) {
    const newSquare = new Square(i, j);
    board.push(newSquare);
    const newSquareDiv = document.createElement('div');
    newSquareDiv.classList.add('square');
    $board.appendChild(newSquareDiv);
  }
}
// get adjacent list of possible moves for knight
const getKnightSquares = (square) => {
  const moves = [
    [-2, 1],
    [-1, 2],
    [1, 2],
    [2, 1],
    [2, -1],
    [1, -2],
    [-1, -2],
    [-2, -1],
  ];
  const possibleMoves = [];
  moves.forEach((move) => {
    const newMoveX = square.x + move[0];
    const newMoveY = square.y + move[1];
    if (newMoveX >= 0 && newMoveX < BOARDSIZE && newMoveY >= 0 && newMoveY < BOARDSIZE) {
      possibleMoves.push([newMoveX, newMoveY]);
    }
  });
  return possibleMoves;
};
board.forEach((square) => {
  const knightSquares = getKnightSquares(square);
  knightSquares.forEach(([x, y]) => square.addList(x, y));
});
// find functions
const findPositionByCoordinate = (x, y) => x * BOARDSIZE + y;
const findSquareByCoordinate = (x, y) => board.find((square) => square.x === x && square.y === y);
const findPathSquares = (fromSquare, toSquare) => {
  const visitedSquares = new Set();
  const queue = [[fromSquare, [[fromSquare.x, fromSquare.y]]]];
  let path = null;
  while (queue.length) {
    const [currentSquare, currentPath] = queue.shift();
    if (currentSquare === toSquare) {
      path = currentPath;
      break;
    }
    currentSquare.adjacentList.forEach(([x, y]) => {
      if (!visitedSquares.has(`${x},${y}`)) {
        visitedSquares.add(`${x},${y}`);
        const nextSquare = findSquareByCoordinate(x, y);
        queue.push([nextSquare, currentPath.concat([[x, y]])]);
      }
    });
  }
  return path;
};

const $squares = document.querySelectorAll('.square');
const changeKnightPosition = (index, animation = true) => {
  $squares.forEach((square) => {
    square.innerHTML = '';
    square.classList.remove('knight', 'rotate');
  });

  // Add an image inside the clicked square
  const square = $squares[index];
  square.innerHTML = '<img src="./src/horse.png" alt="Knight">';
  square.classList.add('knight');
  if (animation) square.classList.add('rotate');
  return [square, index];
};

// Knight initial div position
let fromPosition = 28;
const setHomePosition = (i) => {
  $squares.forEach((sq) => sq.classList.remove('possible'));
  const [fromPositionDiv, index] = changeKnightPosition(i, false);
  $squares.forEach((sq) => sq.classList.remove('from'));
  fromPositionDiv.classList.add('from');
  fromPositionDiv.classList.remove('to');
  fromPosition = index;
};
setHomePosition(fromPosition);

// Knight possible div positions
const setPossibleMoves = (i) => {
  $squares.forEach((sq) => sq.classList.remove('possible'));
  const nextMoves = board[i].adjacentList;
  nextMoves.forEach((move) => {
    const pos = findPositionByCoordinate(move[0], move[1]);
    $squares[pos].classList.add('possible');
  });
  console.log(nextMoves);
};
// Path printing message
const printMessage = (arr) => {
  $message.innerHTML = '';
  arr.forEach((coord, index) => {
    if (index === arr.length - 1) {
      $message.textContent += `[${coord[0]}, ${coord[1]}]`;
    } else {
      $message.textContent += `[${coord[0]}, ${coord[1]}] => `;
    }
  });
  $message.style.opacity = '1';
};
// Knight path animation over divs
const findRouteByNextPosition = (index) => {
  const a = board[fromPosition];
  const b = board[index];
  const path = findPathSquares(a, b);
  const lastPositionPath = findPositionByCoordinate(
    path[path.length - 1][0],
    path[path.length - 1][1],
  );
  $squares.forEach((sq) => sq.classList.remove('to'));
  $squares[lastPositionPath].classList.add('to');
  console.log(path);
  $message.style.opacity = 0;

  path.forEach((pos, i) => {
    const newPos = findPositionByCoordinate(pos[0], pos[1]);

    setTimeout(() => {
      console.log(i);
      if (i !== path.length - 1) {
        console.log(i, path.length - 1);
        setPossibleMoves(newPos);
        changeKnightPosition(newPos);
      } else {
        setHomePosition(lastPositionPath);
        printMessage(path);
      }
    }, i * 1500);
  });
};

// add listeners to board subdivs
$squares.forEach((square, index) => {
  square.addEventListener('click', () => findRouteByNextPosition(index));
  square.addEventListener('mouseover', (event) => {
    const sq = board[index];
    $tooltip.textContent = `[${sq.x}, ${sq.y}]`;
    $tooltip.style.left = `${event.pageX + 10}px`;
    $tooltip.style.top = `${event.pageY + 10}px`;
    $tooltip.style.display = 'block';
  });
  square.addEventListener('mouseout', () => {
    $tooltip.style.display = 'none';
  });
});
