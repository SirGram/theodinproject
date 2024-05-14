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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const user_model_1 = require("../models/user.model");
const message_model_1 = require("../models/message.model");
const db_1 = require("../config/db");
function dropData() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Drop previous db
            yield mongoose_1.default.connection.db.dropCollection('users');
            console.log('Collection users is dropped.');
            yield mongoose_1.default.connection.db.dropCollection('messages');
            console.log('Collection messages is dropped.');
        }
        catch (err) {
            console.error('Error dropping data:', err);
        }
    });
}
function populateData() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield (0, db_1.connectToDB)();
            yield dropData();
            const users = yield user_model_1.User.create([
                {
                    userName: 'user1',
                    firstName: 'John',
                    lastName: 'Doe',
                    email: 'user1@example.com',
                    password: 'hash_the_password',
                },
                {
                    userName: 'user2',
                    firstName: 'Jane',
                    lastName: 'Smith',
                    email: 'user2@example.com',
                    password: 'hash_the_password',
                },
            ]);
            const messages = yield Promise.all(users.map((user) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const messageContent = `Message from ${user.userName}`;
                    const message = new message_model_1.Message({ content: messageContent, sender: user._id });
                    return message.save();
                }
                catch (error) {
                    console.error(`Error creating message for user ${user.userName}:`, error);
                }
            })));
            console.log('Created users:', users);
            console.log('Created messages:', messages);
        }
        catch (err) {
            console.error('Error populating data:', err);
        }
        finally {
            yield mongoose_1.default.connection.close();
        }
    });
}
populateData()
    .then(() => console.log('Process done'))
    .catch((error) => console.error('Error populating database:', error));
