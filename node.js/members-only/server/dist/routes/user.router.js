"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
const user_controller_1 = require("../controllers/user.controller");
const router = (0, express_1.Router)();
// /api/users
router.get("/me", authMiddleware_1.default, user_controller_1.me);
exports.default = router;
