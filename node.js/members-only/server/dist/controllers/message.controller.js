"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMessages = exports.createMessage = void 0;
const message_model_1 = require("../models/message.model");
const createMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { content, timestamp, sender } = req.body;
    try {
        const newMessage = yield message_model_1.Message.create({
            content,
            timestamp,
            sender,
        });
        yield newMessage.save();
        res.json({
            message: "Message created succesfully",
            userMessage: newMessage,
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error" });
    }
});
exports.createMessage = createMessage;
const getMessages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const messages = yield message_model_1.Message.find({}).populate("sender", "-password");
        res.json(messages);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});
exports.getMessages = getMessages;
