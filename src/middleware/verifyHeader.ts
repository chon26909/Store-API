import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const handleAuthentication = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        try {
            const token = authHeader.split('Bearer ')[1];
            const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
            res.locals.token = decoded;
            return next();
        } catch (error) {
            return res.status(401).json({ message: 'Invalid Token' });
        }
    } else {
        return res.status(403).json({ message: 'Unauthorized' });
    }
};
