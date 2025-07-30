import { User } from '@/types';
import { NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';

const secretKey = process.env.JWT_SECRET || 'your_secret_key';

export const authenticateToken = (req: any, res: any, next: NextFunction) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token)
        return res.status(StatusCodes.UNAUTHORIZED).json({
            message: 'No token provided. Please log in.',
        });

    jwt.verify(token, secretKey, (err: any, decoded: any) => {
        if (err)
            return res.status(StatusCodes.FORBIDDEN).json({
                message: 'Invalid token. Please log in again.',
            });

        if (!decoded || typeof decoded !== 'object' || !('id' in decoded)) {
            return res.status(StatusCodes.FORBIDDEN).json({
                message: 'Invalid token payload.',
            });
        }
        req.user = decoded as User;
        next();
    });
};

export const protectRoute = (req: any, res: any, next: NextFunction) => {
    if (!req.user) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            message: 'Unauthorized access. Please log in.',
        });
    }
    next();
};
