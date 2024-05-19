"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const message_controller_1 = require("../controllers/message.controller");
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
const router = (0, express_1.Router)();
// /api/messages
router.get("/", message_controller_1.getMessages);
router.post("/", authMiddleware_1.default, message_controller_1.createMessage);
router.delete("/:id", authMiddleware_1.default, message_controller_1.deleteMessage);
exports.default = router;
