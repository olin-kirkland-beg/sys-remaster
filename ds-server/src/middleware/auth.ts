import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';

// Extend Express Request interface to include 'user'
declare global {
    namespace Express {
        interface Request {
            user?: any;
        }
    }
}

const secretKey = process.env.JWT_SECRET || 'your_secret_key';

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token)
        return res.status(StatusCodes.UNAUTHORIZED).json({
            message: 'No token provided. Please log in.',
        });

    jwt.verify(token, secretKey, (err, user) => {
        if (err)
            return res.status(StatusCodes.FORBIDDEN).json({
                message: 'Invalid token. Please log in again.',
            });
        req.user = user;
        next();
    });
};

export const protectRoute = (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            message: 'Unauthorized access. Please log in.',
        });
    }
    next();
};
