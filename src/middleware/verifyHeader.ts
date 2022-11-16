import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const handleAuthentication = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    const secret = process.env.SECRET!;

    if (authHeader) {
        try {
            const token = authHeader.split(' ')[1];
            // const decoded = await jwt.verify(token, secret);
            // res.locals.token = decoded;
            return next();
        } catch (error) {
            return res.status(400).json({ message: 'Invalid Token' });
        }
    } else {
        return res.status(401).json({ message: 'Unauthorized' });
    }
};
