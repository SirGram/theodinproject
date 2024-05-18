import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'your_jwt_secret_key';

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('x-auth-token');

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
  /*   const decoded = jwt.verify(token, JWT_SECRET) as { user: any };
    req.user = decoded.user; */
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

export default authMiddleware;
