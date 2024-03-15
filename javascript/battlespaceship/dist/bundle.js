/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Music.js":
/*!**********************!*\
  !*** ./src/Music.js ***!
  \**********************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n\r\nconst audio = new Audio(\"./src/music/song-of-war.mp3\");\r\nconst volumeControl = document.getElementById(\"volumeControl\");\r\nconst volumeIcon = document.getElementById(\"volumeIcon\");\r\nconst volumeRange = document.getElementById(\"volumeRange\");\r\n\r\nvolumeIcon.addEventListener(\"click\", function () {\r\n  if (audio.volume === 0) {\r\n    audio.volume = volumeRange.value || 0.5; \r\n  } else {\r\n    audio.volume = 0;\r\n  }\r\n  updateVolumeIcon();\r\n});\r\n\r\nvolumeControl.addEventListener(\"mouseenter\", function () {\r\n  volumeRange.style.opacity = 1;\r\n});\r\n\r\nvolumeControl.addEventListener(\"mouseleave\", function () {\r\n  volumeRange.style.opacity = 0;\r\n});\r\n\r\nfunction updateVolumeIcon() {\r\n  const icon = document.querySelector(\".material-symbols-sharp\");\r\n  if (audio.volume === 0) {\r\n    icon.textContent = \"volume_off\";\r\n  } else {\r\n    volumeIcon.style.backgroundColor = \"var(--transparent)\";\r\n    icon.textContent = \"volume_up\";\r\n  }\r\n}\r\n\r\nvolumeRange.addEventListener(\"input\", function () {\r\n  audio.volume = volumeRange.value;\r\n  updateVolumeIcon();\r\n});\r\nconst playBackgroundMusic = () => {\r\n  audio.play();\r\n  audio.autoplay = true;\r\n};\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (playBackgroundMusic);\n\n//# sourceURL=webpack://battlespaceship/./src/Music.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _modules_Player_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/Player.js */ \"./src/modules/Player.js\");\n/* harmony import */ var _modules_Gameboard_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/Gameboard.js */ \"./src/modules/Gameboard.js\");\n/* harmony import */ var _modules_Spaceship_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/Spaceship.js */ \"./src/modules/Spaceship.js\");\n/* harmony import */ var _modules_Dom_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/Dom.js */ \"./src/modules/Dom.js\");\n/* harmony import */ var _Music_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Music.js */ \"./src/Music.js\");\n/* eslint-disable */\r\n\r\n\r\n\r\n\r\n\r\n\r\nconst $gameMode = document.getElementById(\"game-mode\");\r\nconst $gameModeButton1 = document.getElementById(\"mode1\");\r\nconst $gameModeButton2 = document.getElementById(\"mode2\");\r\nconst $gameModeButton3 = document.getElementById(\"mode3\");\r\nlet gameMode;\r\nlet gameOver = false;\r\nconst spaceshipType = {\r\n  sentinel: {\r\n    name: \"sentinel\",\r\n    lengthX: 2,\r\n    lengthY: 1,\r\n    imgPath: \"./src/img/sp5.png\",\r\n  },\r\n  striker: {\r\n    name: \"striker\",\r\n    lengthX: 2,\r\n    lengthY: 1,\r\n    imgPath: \"./src/img/sp4.png\",\r\n  },\r\n  orion: {\r\n    name: \"orion\",\r\n    lengthX: 3,\r\n    lengthY: 1,\r\n    imgPath: \"./src/img/sp1.png\",\r\n  },\r\n  apolo24: {\r\n    name: \"apolo24\",\r\n    lengthX: 5,\r\n    lengthY: 1,\r\n    imgPath: \"./src/img/sp2.png\",\r\n  },\r\n  starblaze: {\r\n    name: \"starblaze\",\r\n    lengthX: 3,\r\n    lengthY: 2,\r\n    imgPath: \"./src/img/sp3.png\",\r\n  },\r\n};\r\n\r\n// set board\r\nconst initializeGame = () => {\r\n  (0,_Music_js__WEBPACK_IMPORTED_MODULE_4__[\"default\"])();\r\n  const newDom = new _modules_Dom_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"]();\r\n\r\n  $gameMode.style.display = \"none\";\r\n  const $boardgames = document.querySelector(\"#boardgames\");\r\n  $boardgames.style.display = \"flex\";\r\n  const $boardgame = document.querySelector(\"#boardgame1\");\r\n  const $boardgame2 = document.querySelector(\"#boardgame2\");\r\n  setTimeout(() => {\r\n    $boardgame.style.opacity = 1;\r\n    $boardgame2.style.opacity = 1;\r\n  }, 1000);\r\n\r\n  const player = new _modules_Player_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"](\"Player 1\", true);\r\n  const player2 = new _modules_Player_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"](\"Player 2\");\r\n  const playerBoard = new _modules_Gameboard_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"]();\r\n  const player2Board = new _modules_Gameboard_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"]();\r\n\r\n  return {\r\n    newDom,\r\n    $boardgame,\r\n    $boardgame2,\r\n    player,\r\n    player2,\r\n    playerBoard,\r\n    player2Board,\r\n  };\r\n};\r\nlet newDom, $boardgame, $boardgame2, player, player2, playerBoard, player2Board;\r\nfunction handleGameModeClick(mode) {\r\n  gameMode = mode;\r\n  ({\r\n    newDom,\r\n    $boardgame,\r\n    $boardgame2,\r\n    player,\r\n    player2,\r\n    playerBoard,\r\n    player2Board,\r\n  } = initializeGame());\r\n  startGame();\r\n}\r\n\r\n$gameModeButton1.addEventListener(\"click\", () => handleGameModeClick(\"mode1\"));\r\n$gameModeButton2.addEventListener(\"click\", () => handleGameModeClick(\"mode2\"));\r\n$gameModeButton3.addEventListener(\"click\", () => handleGameModeClick(\"mode3\"));\r\n\r\nconst playerTurn = (e, player, playerBoard, boardGame) => {\r\n  const findClickedSquare = () => {\r\n    const squareClicked = e.target;\r\n    const x = parseInt(squareClicked.dataset.x);\r\n    const y = parseInt(squareClicked.dataset.y);\r\n    return { x, y };\r\n  };\r\n  //attacks the other board\r\n  if (!player.turn) return;\r\n  toggleTurn();\r\n  if (mode !== \"ai\") {\r\n    const { x, y } = findClickedSquare();\r\n    player.attack(playerBoard, x, y);\r\n  } else {\r\n    console.log(\"rando\");\r\n    player.randomAttack(playerBoard);\r\n  }\r\n  newDom.updateBoard(boardGame, playerBoard);\r\n\r\n  // check game state\r\n  console.log(\"game over\", gameOver);\r\n};\r\n\r\nconst startGame = () => {\r\n  const setBoardsSameSize = () => {\r\n    //set both boards same size\r\n    const squareBoard1 = $boardgame.querySelector(\".square\");\r\n    const squareBoard2 = $boardgame2.querySelector(\".square\");\r\n    const computedStyleBoard2 = window.getComputedStyle(squareBoard2);\r\n    const paddingBoard2 = computedStyleBoard2.getPropertyValue(\"padding\");\r\n    squareBoard1.style.padding = paddingBoard2;\r\n  };\r\n  const placeRandomly = (playerBoard) => {\r\n    Object.keys(spaceshipType).forEach((spaceship) => {\r\n      const spaceshipName = spaceshipType[spaceship];\r\n      const newSpaceship = new _modules_Spaceship_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"](spaceshipName);\r\n      console.log(playerBoard);\r\n      playerBoard.placeSpaceshipRandomly(newSpaceship);\r\n    });\r\n  };\r\n  const toggleTurn = () => {\r\n    player.turn = !player.turn;\r\n    player2.turn = !player2.turn;\r\n  };\r\n  const isGameOver = (board) => {\r\n    return board.allSunk();\r\n  };\r\n  const playerTurn = (player, playerBoard, boardGame) => {\r\n    setTimeout(() => {\r\n      //attack enemy\r\n      player.randomAttack(playerBoard);\r\n      newDom.updateBoard(boardGame, playerBoard);\r\n      gameOver = isGameOver(playerBoard);\r\n    }, 1000);\r\n  };\r\n  const getCurrentTurns = async () => {\r\n    await new Promise((resolve) => setTimeout(resolve, 1000));\r\n    let currentPlayer, currentEnemyBoard, currentEnemyBoardGame;\r\n    if (player.turn) {\r\n      currentPlayer = player;\r\n      currentEnemyBoard = player2Board;\r\n      currentEnemyBoardGame = $boardgame2;\r\n    } else {\r\n      currentPlayer = player2;\r\n      currentEnemyBoard = playerBoard;\r\n      currentEnemyBoardGame = $boardgame;\r\n    }\r\n    return { currentPlayer, currentEnemyBoard, currentEnemyBoardGame };\r\n  };\r\n  const gameLoop = async () => {\r\n    while (!gameOver) {\r\n      const { currentPlayer, currentEnemyBoard, currentEnemyBoardGame } =\r\n        await getCurrentTurns();\r\n      const hit = playerTurn(currentPlayer, currentEnemyBoard, currentEnemyBoardGame);\r\n      if (!hit) toggleTurn();\r\n    }\r\n  };\r\n  // Game Modes\r\n  if (gameMode === \"mode3\") {\r\n    //place random ships both boards\r\n    placeRandomly(player2Board);\r\n    placeRandomly(playerBoard);\r\n    console.log(playerBoard.spaceships);\r\n    console.log(player2Board.spaceships);\r\n    newDom.displayBoard($boardgame, playerBoard);\r\n    newDom.displayBoard($boardgame2, player2Board);\r\n    setBoardsSameSize();\r\n  }\r\n  gameLoop();\r\n};\r\n\r\n/* // board clicks\r\nconst boardListeners = () => {\r\n  $boardgame2.addEventListener(\"click\", (e) => {\r\n    if (!gameOver) {\r\n      playerTurn(e, player, player2Board, $boardgame2);\r\n      // ai attack\r\n      if (gameMode === \"ai\") {\r\n        setTimeout(() => {\r\n          playerTurn(e, player2, playerBoard, $boardgame, gameMode);\r\n        }, 1000);\r\n      }\r\n    }\r\n  });\r\n  // normal mode\r\n  $boardgame.addEventListener(\"click\", (e) => {\r\n    if (!gameOver && gameMode !== \"ai\") {\r\n      playerTurn(e, player2, playerBoard, $boardgame);\r\n    }\r\n  });\r\n}; */\r\n\n\n//# sourceURL=webpack://battlespaceship/./src/index.js?");

/***/ }),

/***/ "./src/modules/Dom.js":
/*!****************************!*\
  !*** ./src/modules/Dom.js ***!
  \****************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nclass Dom {\r\n  constructor() {}\r\n\r\n  displayBoard(boardDiv, gameBoard, size = 10) {\r\n    // make squares\r\n    for (let x = 0; x < size; x++) {\r\n      for (let y = 0; y < size; y++) {\r\n        const square = document.createElement(\"div\");\r\n        square.classList.add(\"square\");\r\n        square.dataset.x = x;\r\n        square.dataset.y = y;\r\n        boardDiv.appendChild(square);\r\n      }\r\n    }\r\n    // place ships\r\n    gameBoard.spaceships.forEach(([spaceship, coords]) => {\r\n      if (spaceship) {\r\n        let minX = Infinity;\r\n        let maxX = -Infinity;\r\n        let minY = Infinity;\r\n        let maxY = -Infinity;\r\n        coords.forEach(([x, y]) => {\r\n          minX = Math.min(minX, x);\r\n          maxX = Math.max(maxX, x);\r\n          minY = Math.min(minY, y);\r\n          maxY = Math.max(maxY, y);\r\n        });\r\n        const imageDiv = document.createElement(\"div\");\r\n        imageDiv.classList.add(\"spaceship\");\r\n        imageDiv.classList.add(`${spaceship.name}`);\r\n        imageDiv.style.gridArea = `${minX + 1} / ${minY + 1} / ${maxX + 2} / ${\r\n          maxY + 2\r\n        }`;\r\n        imageDiv.style.backgroundImage = `url(${spaceship.image})`;\r\n        imageDiv.style.backgroundSize = \"cover\";\r\n        boardDiv.appendChild(imageDiv);\r\n      }\r\n    });\r\n  }\r\n\r\n  updateBoard(boardDiv, gameBoard) {\r\n    // orange bg for misses\r\n    gameBoard.missed.forEach(([x, y]) => {\r\n      const missedSquare = boardDiv.querySelector(\r\n        `[data-x=\"${x}\"][data-y=\"${y}\"]`\r\n      );\r\n      if (missedSquare.childElementCount === 0) {\r\n        const circleDiv = document.createElement(\"div\");\r\n        circleDiv.classList.add(\"missed\");\r\n        missedSquare.appendChild(circleDiv);\r\n      }\r\n    });\r\n    // red bg for hits\r\n    gameBoard.hits.forEach(([x, y]) => {\r\n      const square = boardDiv.querySelector(`[data-x=\"${x}\"][data-y=\"${y}\"]`);\r\n      if (square.childElementCount === 0){ const circleDiv = document.createElement(\"div\");\r\n        circleDiv.classList.add(\"hit\");\r\n        square.appendChild(circleDiv);}\r\n    });\r\n    // unveil sunken ship\r\n    gameBoard.spaceships.forEach(([spaceship]) => {\r\n      const imageDiv = document.querySelector(`.${spaceship.name}`);\r\n      if (spaceship.isSunk()) {\r\n        console.log(\"spaceship sunk\");\r\n        setTimeout(() => {\r\n          imageDiv.classList.add(\"sunk\");\r\n        }, 0.5);\r\n      }\r\n    });\r\n  }\r\n}\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Dom);\r\n\n\n//# sourceURL=webpack://battlespaceship/./src/modules/Dom.js?");

/***/ }),

/***/ "./src/modules/Gameboard.js":
/*!**********************************!*\
  !*** ./src/modules/Gameboard.js ***!
  \**********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* eslint-disable */\r\nclass Gameboard {\r\n  constructor(size = 10) {\r\n    this.size = size;\r\n    this.matrix = Array.from({ length: this.size }, () =>\r\n      Array(this.size).fill(0)\r\n    );\r\n    this.missed = [];\r\n    this.spaceships = [];\r\n    this.hits = [];\r\n\r\n    const spaceshipCoord = (x, y, x1, y1) => {\r\n      const coordinates = [];\r\n      for (let i = x; i <= x1; i++) {\r\n        for (let j = y; j <= y1; j++) {\r\n          this.matrix[i][j] = 1;\r\n          coordinates.push([i, j]);\r\n        }\r\n      }\r\n      return coordinates;\r\n    };\r\n    this.placeSpaceshipRandomly = (spaceship) => {\r\n      const alreadyFit = (coordinates) => {\r\n        return !this.spaceships.some(([_, coords]) =>\r\n          coords.some(([cx, cy]) =>\r\n            coordinates.some(([nx, ny]) => cx === nx && cy === ny)\r\n          )\r\n        );\r\n      };\r\n      const randomValues = () => {\r\n        let x = Math.floor(Math.random() * this.size);\r\n        let y = Math.floor(Math.random() * this.size);\r\n        let x1 = x + spaceship.lengthX - 1;\r\n        let y1 = y + spaceship.lengthY - 1;\r\n        return { x, y, x1, y1 };\r\n      };\r\n      let x, y, x1, y1;\r\n      do {\r\n        ({ x, y, x1, y1 } = randomValues());\r\n      } while (y1 >= this.size || x < 0 || y < 0 || x1 >= this.size);\r\n      const coords = spaceshipCoord(x, y, x1, y1);\r\n\r\n      console.log(coords);\r\n      if (!alreadyFit(coords)) {\r\n        this.placeSpaceshipRandomly(spaceship);\r\n      } else {\r\n        this.spaceships.push([spaceship, coords]);\r\n      }\r\n    };\r\n\r\n    this.placeSpaceship = (spaceship, x, y) => {\r\n      const x1 = x + spaceship.lengthX - 1;\r\n      const y1 = y + spaceship.lengthY - 1;\r\n      if (y1 >= this.size || x < 0 || y < 0 || x1 >= this.size) return;\r\n      const coordinates = spaceshipCoord(x, y, x1, y1);\r\n      this.spaceships.push([spaceship, coordinates]);\r\n    };\r\n  }\r\n\r\n  receiveAttack(x, y) {\r\n    if (this.matrix[x][y] === 1) {\r\n      const spaceship = this.getSpaceship(x, y);\r\n      spaceship.hit();\r\n      this.hits.push([x, y]);\r\n      return true\r\n    } else {\r\n      this.missed.push([x, y]);\r\n      return false\r\n    }\r\n  }\r\n \r\n\r\n  getSpaceship(x, y) {\r\n    let foundSpaceship = null;\r\n    this.spaceships.forEach(([spaceship, coordinates]) => {\r\n      if (coordinates.some(([cx, cy]) => cx === x && cy === y)) {\r\n        foundSpaceship = spaceship;\r\n      }\r\n    });\r\n    return foundSpaceship;\r\n  }\r\n\r\n  allSunk() {\r\n    return this.spaceships.every(([spaceship, _]) => spaceship.isSunk());\r\n  }\r\n}\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Gameboard);\r\n\n\n//# sourceURL=webpack://battlespaceship/./src/modules/Gameboard.js?");

/***/ }),

/***/ "./src/modules/Player.js":
/*!*******************************!*\
  !*** ./src/modules/Player.js ***!
  \*******************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n\r\nclass Player {\r\n  constructor(name, turn = false) {\r\n    this.name = name;\r\n    this.turn = turn;\r\n  }\r\n\r\n  attack(gameBoard, x, y) {\r\n    console.log(x, y);\r\n    return gameBoard.receiveAttack(x, y);\r\n  }\r\n\r\n  randomAttack(gameBoard) {\r\n    const coordinates = [...gameBoard.hits, ...gameBoard.missed];  \r\n    console.log(coordinates)  \r\n    let x, y;\r\n    do {\r\n      x = Math.floor(Math.random() * gameBoard.size);\r\n      y = Math.floor(Math.random() * gameBoard.size);\r\n    } while (coordinates.some(coord => coord.x === x && coord.y === y));\r\n    console.log(x,y)\r\n    return gameBoard.receiveAttack(x, y);\r\n  }\r\n}\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Player);\r\n\n\n//# sourceURL=webpack://battlespaceship/./src/modules/Player.js?");

/***/ }),

/***/ "./src/modules/Spaceship.js":
/*!**********************************!*\
  !*** ./src/modules/Spaceship.js ***!
  \**********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* eslint-disable */\r\nclass Spaceship {\r\n  constructor(data) {\r\n    const { name, lengthX, lengthY, imgPath } = data;\r\n    this.name = name;\r\n    this.lengthX = lengthX;\r\n    this.lengthY = lengthY;\r\n    this.hits = 0;\r\n    this.image = imgPath;\r\n  }\r\n\r\n  hit() {\r\n    if (this.hits < this.lengthX * this.lengthY) this.hits += 1;\r\n  }\r\n\r\n  isSunk() {\r\n    return this.hits === this.lengthX * this.lengthY;\r\n  }\r\n}\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Spaceship);\r\n\n\n//# sourceURL=webpack://battlespaceship/./src/modules/Spaceship.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;