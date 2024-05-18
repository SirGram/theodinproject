"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_router_1 = __importDefault(require("./routes/user.router"));
const message_router_1 = __importDefault(require("./routes/message.router"));
const auth_router_1 = __importDefault(require("./routes/auth.router"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const corsOptions = {
    origin: "*",
};
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
app.use('/api/users', user_router_1.default);
app.use('/api/messages', message_router_1.default);
app.use('/api/auth', auth_router_1.default);
exports.default = app;
