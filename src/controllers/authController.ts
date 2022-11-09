import { Request, Response } from 'express';
import { RowDataPacket } from 'mysql2';
import { db } from '../config/database';
import { IAuth } from '../types/auth';

export const handleLogin = (req: Request, res: Response) => {
    console.log('login');

    const { email, password }: IAuth = req.body;

    const q = 'SELECT email, password, salt FROM users WHERE email = ?';

    let result;

    db.query(q, [email], (err, data) => {
        if (err) {
            console.log('err', err);
        }
        if (data) {
            result = data;
        }
    });

    // if (result?.length > 0) {

    // }

    res.status(200).json({ message: 'success' });
};
