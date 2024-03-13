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

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _modules_Player_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/Player.js */ \"./src/modules/Player.js\");\n/* harmony import */ var _modules_Gameboard_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/Gameboard.js */ \"./src/modules/Gameboard.js\");\n/* harmony import */ var _modules_Spaceship_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/Spaceship.js */ \"./src/modules/Spaceship.js\");\n/* harmony import */ var _modules_Dom_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/Dom.js */ \"./src/modules/Dom.js\");\n/* eslint-disable */\r\n\r\n\r\n\r\n\r\n\r\nconst spaceshipType = {\r\n  sentinel: { lengthX: 2, lengthY: 1, imgPath: './src/img/sp5.png' },\r\n  striker: { lengthX: 2, lengthY: 1, imgPath: './src/img/sp4.png' },\r\n  orion: { lengthX: 3, lengthY: 1, imgPath: './src/img/sp1.png' },\r\n  apolo24: { lengthX: 5, lengthY: 1, imgPath: './src/img/sp2.png' },\r\n  starblaze: { lengthX: 3, lengthY: 2, imgPath: './src/img/sp3.png' },\r\n};\r\n\r\nconst player = new _modules_Player_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]('Player 1');\r\nconst player2 = new _modules_Player_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]('Player 2');\r\nconst playerBoard = new _modules_Gameboard_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"]();\r\nconst player2Board = new _modules_Gameboard_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"]();\r\n\r\n// main loop\r\n\r\nconst sp1 = new _modules_Spaceship_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"](spaceshipType['sentinel']);\r\nconst sp2 = new _modules_Spaceship_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"](spaceshipType['starblaze']);\r\nconsole.log(sp1);\r\nplayer2Board.placeSpaceship(sp1, 2, 3);\r\nplayer2Board.placeSpaceship(sp2, 0, 0);\r\nconsole.log('player2', player2Board.matrix);\r\nconsole.log('player2 spaceships', player2Board.spaceships);\r\n\r\nconst newDom = new _modules_Dom_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"]();\r\nconst $boardgame1 = document.querySelector('#boardgame1');\r\nconst $boardgame2 = document.querySelector('#boardgame2');\r\nnewDom.displayBoard($boardgame1);\r\nnewDom.displayBoard($boardgame2);\r\n\r\n$boardgame2.addEventListener('click', (e) => {\r\n  //attacks the other board\r\n  const squareClicked = e.target;\r\n  const x = parseInt(squareClicked.dataset.x);\r\n  const y = parseInt(squareClicked.dataset.y);\r\n  player2Board.receiveAttack(x, y);\r\n  newDom.updateBoard($boardgame2, player2Board);\r\n  console.log(player2Board.spaceships);\r\n});\r\n\n\n//# sourceURL=webpack://battlespaceship/./src/index.js?");

/***/ }),

/***/ "./src/modules/Dom.js":
/*!****************************!*\
  !*** ./src/modules/Dom.js ***!
  \****************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* eslint-disable */\r\nclass Dom {\r\n  displayBoard(boardDiv, size = 10) {\r\n    boardDiv.innerHTML = '';\r\n    for (let x = 0; x < size; x++) {\r\n      for (let y = 0; y < size; y++) {\r\n        const square = document.createElement('div');\r\n        square.classList.add('square');\r\n        square.dataset.x = x;\r\n        square.dataset.y = y;\r\n        boardDiv.appendChild(square);\r\n      }\r\n    }\r\n  }\r\n  updateBoard(boardDiv, gameBoard) {\r\n    this.displayBoard(boardDiv);\r\n    //orange bg for misses\r\n    gameBoard.missed.forEach(([x, y]) => {\r\n      const missedSquare = boardDiv.querySelector(`[data-x=\"${x}\"][data-y=\"${y}\"]`);\r\n      if (missedSquare) missedSquare.classList.add('missed');\r\n    });\r\n    // red bg for hits\r\n    gameBoard.hits.forEach(([x, y]) => {\r\n      const square = boardDiv.querySelector(`[data-x=\"${x}\"][data-y=\"${y}\"]`);\r\n      if (square) square.classList.add('hit');\r\n    });\r\n    //unveil sunken ship\r\n    gameBoard.spaceships.forEach(([spaceship, coords]) => {\r\n      if (spaceship) {\r\n        console.log('spaceship sunk');\r\n        let minX = Infinity;\r\n        let maxX = -Infinity;\r\n        let minY = Infinity;\r\n        let maxY = -Infinity;\r\n        coords.forEach(([x, y]) => {\r\n          minX = Math.min(minX, x);\r\n          maxX = Math.max(maxX, x);\r\n          minY = Math.min(minY, y);\r\n          maxY = Math.max(maxY, y);\r\n        });\r\n        const imageDiv = document.createElement('div');\r\n        imageDiv.classList.add('spaceship');\r\n        imageDiv.style.gridArea = `${minX + 1} / ${minY + 1} / ${maxX + 2} / ${maxY + 2}`;\r\n        imageDiv.style.backgroundImage = `url(${spaceship.image})`;\r\n        imageDiv.style.backgroundSize = 'cover';\r\n        boardDiv.appendChild(imageDiv);\r\n        if (spaceship.isSunk()) {\r\n          imageDiv.style.opacity = '0.5';\r\n        }\r\n      }\r\n    });\r\n  }\r\n}\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Dom);\r\n\n\n//# sourceURL=webpack://battlespaceship/./src/modules/Dom.js?");

/***/ }),

/***/ "./src/modules/Gameboard.js":
/*!**********************************!*\
  !*** ./src/modules/Gameboard.js ***!
  \**********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* eslint-disable */\r\nclass Gameboard {\r\n  constructor(size = 10) {\r\n    this.size = size;\r\n    this.matrix = Array.from({ length: this.size }, () => Array(this.size).fill(0));\r\n    this.missed = [];\r\n    this.spaceships = [];\r\n    this.hits = [];\r\n  }\r\n\r\n  placeSpaceship(spaceship, x, y) {\r\n    const coordinates = [];\r\n    const x1 = x + spaceship.lengthX - 1;\r\n    const y1 = y + spaceship.lengthY - 1;\r\n    if (y1 >= this.size || x < 0 || y < 0 || x1 >= this.size) return;\r\n    for (let i = x; i <= x1; i++) {\r\n      for (let j = y; j <= y1; j++) {\r\n        this.matrix[i][j] = 1;\r\n        coordinates.push([i, j]);\r\n      }\r\n    }\r\n    this.spaceships.push([spaceship, coordinates]);\r\n  }\r\n\r\n  receiveAttack(x, y) {\r\n    if (this.matrix[x][y] === 1) {\r\n      const spaceship = this.getSpaceship(x, y);\r\n      spaceship.hit();\r\n      this.hits.push([x, y]);\r\n    } else {\r\n      this.missed.push([x, y]);\r\n    }\r\n  }\r\n\r\n  getSpaceship(x, y) {\r\n    let foundSpaceship = null;\r\n    this.spaceships.forEach(([spaceship, coordinates]) => {\r\n      if (coordinates.some(([cx, cy]) => cx === x && cy === y)) {\r\n        foundSpaceship = spaceship;\r\n      }\r\n    });\r\n    return foundSpaceship;\r\n  }\r\n\r\n  allSunk() {\r\n    return this.spaceships.every(([spaceship, _]) => spaceship.isSunk());\r\n  }\r\n}\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Gameboard);\r\n\n\n//# sourceURL=webpack://battlespaceship/./src/modules/Gameboard.js?");

/***/ }),

/***/ "./src/modules/Player.js":
/*!*******************************!*\
  !*** ./src/modules/Player.js ***!
  \*******************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nclass Player {\r\n  constructor(name) {\r\n    this.name = name;\r\n  }\r\n  attack(gameBoard, x, y) {\r\n    console.log(x, y);\r\n    gameBoard.receiveAttack(x, y);\r\n  }\r\n  randomAttack(gameBoard) {\r\n    //AI attack\r\n    const x = Math.floor(Math.random() * gameBoard.size);\r\n    const y = Math.floor(Math.random() * gameBoard.size);\r\n    enemyGameboard.receiveAttack(x, y);\r\n  }\r\n}\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Player);\r\n\n\n//# sourceURL=webpack://battlespaceship/./src/modules/Player.js?");

/***/ }),

/***/ "./src/modules/Spaceship.js":
/*!**********************************!*\
  !*** ./src/modules/Spaceship.js ***!
  \**********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* eslint-disable */\r\nclass Spaceship {\r\n  constructor(data) {\r\n    const { lengthX, lengthY, imgPath } = data;\r\n    this.lengthX = lengthX;\r\n    this.lengthY = lengthY;\r\n    this.hits = 0;\r\n    this.image = imgPath;\r\n  }\r\n\r\n  hit() {\r\n    if (this.hits < this.lengthX * this.lengthY) this.hits += 1;\r\n  }\r\n\r\n  isSunk() {\r\n    return this.hits === this.lengthX * this.lengthY;\r\n  }\r\n}\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Spaceship);\r\n\n\n//# sourceURL=webpack://battlespaceship/./src/modules/Spaceship.js?");

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