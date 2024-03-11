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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _modules_Player_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/Player.js */ \"./src/modules/Player.js\");\n/* harmony import */ var _modules_Gameboard_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/Gameboard.js */ \"./src/modules/Gameboard.js\");\n/* harmony import */ var _modules_Spaceship_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/Spaceship.js */ \"./src/modules/Spaceship.js\");\n\r\n\r\n\r\n\r\nconst player = new _modules_Player_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"](\"Player 1\");\r\nconst player2 = new _modules_Player_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"](\"Player 2\");\r\nconst playerBoard = new _modules_Gameboard_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"]();\r\nconst player2Board = new _modules_Gameboard_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"]();\r\n\r\n// main loop\r\n\r\nconsole.log(\"player\", playerBoard.matrix);\r\nconst sp1 = new _modules_Spaceship_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"](2);\r\nplayerBoard.placeSpaceship(sp1, 2, 3);\r\nconsole.log(\"player\", playerBoard.matrix);\r\nplayer2.attack(playerBoard, 2, 4);\r\n\r\nconsole.log(\"player\", playerBoard.matrix);\r\nconsole.log(\"misses\", playerBoard.missed);\r\n\n\n//# sourceURL=webpack://battlespaceship/./src/index.js?");

/***/ }),

/***/ "./src/modules/Gameboard.js":
/*!**********************************!*\
  !*** ./src/modules/Gameboard.js ***!
  \**********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nclass Gameboard {\r\n  constructor(size = 10) {\r\n    this.size = size;\r\n    this.matrix = Array.from({ length: this.size }, () =>\r\n      Array(this.size).fill(0)\r\n    );\r\n    this.missed = [];\r\n    this.spaceships = [];\r\n  }\r\n\r\n  placeSpaceship(spaceship, x, y) {\r\n    const coordinates = [];\r\n    const y1 = y + spaceship.length - 1;\r\n    if (y1 >= this.size || x < 0 || y < 0 || y1 < 0) return;\r\n    for (let j = y; j <= y1; j++) {\r\n      this.matrix[x][j] = 1;\r\n      coordinates.push([x, j]);\r\n    }\r\n    this.spaceships.push([spaceship, coordinates]);\r\n  }\r\n\r\n  receiveAttack(x, y) {\r\n    if (this.matrix[x][y] === 1) {\r\n      const spaceship = this.getSpaceship(x, y);\r\n      spaceship.hit();\r\n    } else {\r\n      console.log(x, y);\r\n      this.missed.push([x, y]);\r\n    }\r\n  }\r\n  getSpaceship(x, y) {\r\n    let foundSpaceship = null;\r\n    this.spaceships.forEach(([spaceship, coordinates]) => {\r\n      if (coordinates.some(([cx, cy]) => cx === x && cy === y)) {\r\n        foundSpaceship = spaceship;\r\n      }\r\n    });\r\n    return foundSpaceship;\r\n  }\r\n\r\n  allSunk() {\r\n    return this.spaceships.every(([spaceship, _]) => spaceship.isSunk());\r\n  }\r\n}\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Gameboard);\r\n\n\n//# sourceURL=webpack://battlespaceship/./src/modules/Gameboard.js?");

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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nclass Spaceship {\r\n  constructor(length) {\r\n    this.length = length;\r\n    this.hits = 0;\r\n  }\r\n\r\n  hit() {\r\n    if (this.hits < this.length) this.hits += 1;\r\n  }\r\n\r\n  isSunk() {\r\n    return this.hits === this.length;\r\n  }\r\n}\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Spaceship);\r\n\n\n//# sourceURL=webpack://battlespaceship/./src/modules/Spaceship.js?");

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