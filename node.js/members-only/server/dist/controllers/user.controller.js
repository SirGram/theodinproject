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
exports.registerUser = void 0;
const user_model_1 = require("../models/user.model");
const random_avatar_generator_1 = require("random-avatar-generator");
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userName, firstName, lastName, email, password, registrationDate, } = req.body;
    const generator = new random_avatar_generator_1.AvatarGenerator();
    const avatar = generator.generateRandomAvatar();
    try {
        const existingUser = yield user_model_1.User.findOne({ userName });
        if (existingUser)
            return res.status(400).json({ message: 'User  already exists' });
        const existingEmail = yield user_model_1.User.findOne({ email });
        if (existingEmail)
            return res.status(400).json({ message: 'Email  already exists' });
        const newUser = yield user_model_1.User.create({
            userName,
            firstName,
            lastName,
            email,
            password,
            registrationDate,
            avatar,
        });
        return res.status(200).json({ message: 'Registration successful!' });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error' });
    }
});
exports.registerUser = registerUser;
