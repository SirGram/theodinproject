
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs';
import { IUser } from '../types/interfaces';

const JWT_KEY = process.env.JWT_SECRET!; 

function generateToken(user:IUser) {
    return jwt.sign({ id: user._id, email: user.email }, JWT_KEY, {
        expiresIn: '1h'
    });
}
const verifyToken = (token:string) => {
    return jwt.verify(token, JWT_KEY);
};

