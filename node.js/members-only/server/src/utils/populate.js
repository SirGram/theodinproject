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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var user_model_1 = require("../models/user.model");
var message_model_1 = require("../models/message.model");
var db_1 = require("../config/db");
var random_avatar_generator_1 = require("random-avatar-generator");
var bcryptjs_1 = require("bcryptjs");
function dropData() {
    return __awaiter(this, void 0, void 0, function () {
        var err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    // Drop previous db
                    return [4 /*yield*/, mongoose_1.default.connection.db.dropCollection("users")];
                case 1:
                    // Drop previous db
                    _a.sent();
                    console.log("Collection users is dropped.");
                    return [4 /*yield*/, mongoose_1.default.connection.db.dropCollection("messages")];
                case 2:
                    _a.sent();
                    console.log("Collection messages is dropped.");
                    return [3 /*break*/, 4];
                case 3:
                    err_1 = _a.sent();
                    console.error("Error dropping data:", err_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function populateData() {
    return __awaiter(this, void 0, void 0, function () {
        function createUsers(userData) {
            return __awaiter(this, void 0, void 0, function () {
                var createdUsers, _i, userData_1, user, hashedPassword, newUser, savedUser, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 6, , 7]);
                            createdUsers = [];
                            _i = 0, userData_1 = userData;
                            _a.label = 1;
                        case 1:
                            if (!(_i < userData_1.length)) return [3 /*break*/, 5];
                            user = userData_1[_i];
                            return [4 /*yield*/, (0, bcryptjs_1.hash)(user.password, 10)];
                        case 2:
                            hashedPassword = _a.sent();
                            newUser = new user_model_1.User({
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
                            return [4 /*yield*/, newUser.save()];
                        case 3:
                            savedUser = _a.sent();
                            createdUsers.push(savedUser);
                            console.log("User \"".concat(user.userName, "\" created successfully!"));
                            _a.label = 4;
                        case 4:
                            _i++;
                            return [3 /*break*/, 1];
                        case 5: return [2 /*return*/, createdUsers];
                        case 6:
                            error_1 = _a.sent();
                            console.error("Error creating users: ".concat(error_1));
                            return [2 /*return*/, []];
                        case 7: return [2 /*return*/];
                    }
                });
            });
        }
        function createMessages(messageData, userData) {
            return __awaiter(this, void 0, void 0, function () {
                var messages, createdMessages, error_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            messages = [
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
                            return [4 /*yield*/, message_model_1.Message.insertMany(messages)];
                        case 1:
                            createdMessages = _a.sent();
                            console.log("Messages created successfully!");
                            return [2 /*return*/, createdMessages];
                        case 2:
                            error_2 = _a.sent();
                            console.error("Error creating messages: ".concat(error_2));
                            return [2 /*return*/, []];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        }
        var generator, userData, messageData, createdUsers, createdMessages, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    generator = new random_avatar_generator_1.AvatarGenerator();
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 6, 7, 9]);
                    return [4 /*yield*/, (0, db_1.connectToDB)()];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, dropData()];
                case 3:
                    _a.sent();
                    userData = [
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
                    messageData = [
                        "Hello everyone.",
                        "Is anybody there?",
                        "Yes, we're here. How are you?",
                        "Nice to meet you guys. This website is awesome!",
                    ];
                    return [4 /*yield*/, createUsers(userData)];
                case 4:
                    createdUsers = _a.sent();
                    if (createdUsers.length === 0) {
                        throw new Error("No users created, cannot create messages");
                    }
                    return [4 /*yield*/, createMessages(messageData, createdUsers)];
                case 5:
                    createdMessages = _a.sent();
                    console.log("Created users:", createdUsers);
                    console.log("Created messages:", createdMessages);
                    return [3 /*break*/, 9];
                case 6:
                    err_2 = _a.sent();
                    console.error("Error populating data:", err_2);
                    return [3 /*break*/, 9];
                case 7: return [4 /*yield*/, mongoose_1.default.connection.close()];
                case 8:
                    _a.sent();
                    return [7 /*endfinally*/];
                case 9: return [2 /*return*/];
            }
        });
    });
}
populateData()
    .then(function () { return console.log("Process done"); })
    .catch(function (error) { return console.error("Error populating database:", error); });
