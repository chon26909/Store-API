import { Request, Response } from 'express';
import { db } from '../config/database';
import { generatePassword, generateSalt } from '../helper/auth';

export const createUser = async (req: Request, res: Response) => {
    const body = req.body;
    const salt = await generateSalt();
    const hashPassword = await generatePassword(body.password, salt);
    const date = new Date();

    const q = 'INSERT INTO users (firstname, lastname, email, password, salt, create_at, update_at) VALUES (?, ?, ?, ?, ?, ?, ?)';
    db.query(q, [body.firstname, body.lastname, body.email, hashPassword, salt, date, date], (err) => {
        if (err) {
            res.status(500).json({ message: 'server error' });
        }
    });
    res.status(201).json({ message: 'created' });
};
