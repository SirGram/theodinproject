"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const message_controller_1 = require("../controllers/message.controller");
const router = (0, express_1.Router)();
// /api/messages
router.get("/", message_controller_1.getMessages);
router.post("/", message_controller_1.createMessage);
exports.default = router;
