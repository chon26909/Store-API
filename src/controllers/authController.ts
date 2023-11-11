import { Request, Response } from 'express';
import { IAuth } from '../types/auth';
import { db } from '../database/mysql';

export const handleLogin = (req: Request, res: Response) => {
    console.log('login');

    // db.query('SELECT * FROM users', (err, result) => {
    //     if (err) {
    //         console.log('err', err);
    //     } else {
    //         console.log('result', result);
    //     }
    // });

    // getAllUser()

    // const { email, password }: IAuth = req.body;

    // const q = 'SELECT email, password, salt FROM users WHERE email = ?';

    // db.query(q, [email], (err, data) => {
    //     if (err) {
    //         console.log('err', err);
    //     }
    //     // return res.status(400).json({ message: 'email or password not found' });
    //     if (data) {
    //         res.status(200).json({ message: 'success', token: 'rweihvuberugheht[5tyu8hjiuhjioj' });
    //     }
    // });
};
