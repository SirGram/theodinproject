"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = void 0;
const mongoose_1 = require("mongoose");
const MessageSchema = new mongoose_1.Schema({
    content: {
        type: String,
        required: true,
    },
    timestamp: { type: Date, default: Date.now },
    sender: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
});
exports.Message = (0, mongoose_1.model)('Message', MessageSchema);
