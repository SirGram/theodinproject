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
const random_avatar_generator_1 = require("random-avatar-generator");
const bcryptjs_1 = require("bcryptjs");
function dropData() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Drop previous db
            yield mongoose_1.default.connection.db.dropCollection("users");
            console.log("Collection users is dropped.");
            yield mongoose_1.default.connection.db.dropCollection("messages");
            console.log("Collection messages is dropped.");
        }
        catch (err) {
            console.error("Error dropping data:", err);
        }
    });
}
function populateData() {
    return __awaiter(this, void 0, void 0, function* () {
        const generator = new random_avatar_generator_1.AvatarGenerator();
        function createUsers(userData) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const createdUsers = [];
                    for (const user of userData) {
                        const hashedPassword = yield (0, bcryptjs_1.hash)(user.password, 10);
                        const newUser = new user_model_1.User({
                            userName: user.userName,
                            firstName: user.firstName,
                            lastName: user.lastName,
                            email: user.email,
                            password: hashedPassword,
                            avatar: generator.generateRandomAvatar(),
                            registrationDate: new Date(),
                            isPro: user.isPro,
                            signature: user.signature,
                        });
                        const savedUser = yield newUser.save();
                        createdUsers.push(savedUser);
                        console.log(`User "${user.userName}" created successfully!`);
                    }
                    return createdUsers;
                }
                catch (error) {
                    console.error(`Error creating users: ${error}`);
                    return [];
                }
            });
        }
        function createMessages(messageData, userData) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const messages = [
                        {
                            content: messageData[0],
                            sender: userData[0]._id,
                            timestamp: new Date(),
                        },
                        {
                            content: messageData[1],
                            sender: userData[0]._id,
                            timestamp: new Date(),
                        },
                        {
                            content: messageData[2],
                            sender: userData[1]._id,
                            timestamp: new Date(),
                        },
                        {
                            content: messageData[3],
                            sender: userData[2]._id,
                            timestamp: new Date(),
                        },
                    ];
                    const createdMessages = yield message_model_1.Message.insertMany(messages);
                    console.log("Messages created successfully!");
                    return createdMessages;
                }
                catch (error) {
                    console.error(`Error creating messages: ${error}`);
                    return [];
                }
            });
        }
        try {
            yield (0, db_1.connectToDB)();
            yield dropData();
            const userData = [
                {
                    userName: "user1",
                    firstName: "John",
                    lastName: "Doe",
                    email: "user1@example.com",
                    password: "password1",
                    registrationDate: new Date(),
                    avatar: generator.generateRandomAvatar(),
                    signature: "I make videogames in my spare time. Wanna see them? Check them out at mystore.com",
                    isPro: true,
                },
                {
                    userName: "user2",
                    firstName: "Jane",
                    lastName: "Smith",
                    email: "user2@example.com",
                    password: "password2",
                    registrationDate: new Date(),
                    avatar: generator.generateRandomAvatar(),
                    signature: "My dog's name is Belly",
                    isPro: false,
                },
                {
                    userName: "user3",
                    firstName: "Hercules",
                    lastName: "Copper",
                    email: "user3@example.com",
                    password: "password3",
                    registrationDate: new Date(),
                    avatar: generator.generateRandomAvatar(),
                    isPro: true,
                },
            ];
            const messageData = [
                "Hello everyone.",
                "Is anybody there?",
                "Yes, we're here. How are you?",
                "Nice to meet you guys. This website is awesome!",
            ];
            const createdUsers = yield createUsers(userData);
            if (createdUsers.length === 0) {
                throw new Error("No users created, cannot create messages");
            }
            const createdMessages = yield createMessages(messageData, createdUsers);
            console.log("Created users:", createdUsers);
            console.log("Created messages:", createdMessages);
        }
        catch (err) {
            console.error("Error populating data:", err);
        }
        finally {
            yield mongoose_1.default.connection.close();
        }
    });
}
populateData()
    .then(() => console.log("Process done"))
    .catch((error) => console.error("Error populating database:", error));
