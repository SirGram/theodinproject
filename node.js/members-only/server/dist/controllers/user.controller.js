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
exports.createUser = void 0;
const bcryptjs_1 = require("bcryptjs");
const user_model_1 = require("../models/user.model");
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userName, firstName, lastName, email, password, registrationDate, } = req.body;
    try {
        const existingUser = yield user_model_1.User.findOne({ email });
        if (existingUser)
            return res.status(400).json({ message: 'Email already exists' });
        const newUser = yield user_model_1.User.create({
            userName,
            firstName,
            lastName,
            email,
            password,
            registrationDate,
        });
        const hashedPassword = yield (0, bcryptjs_1.hash)(password, 10);
        newUser.password = hashedPassword;
        yield newUser.save();
        res.json({ message: 'Registration successful!', user: newUser });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});
exports.createUser = createUser;
