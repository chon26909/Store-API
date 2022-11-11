import { Request, Response } from 'express';
import { db } from '../config/database';
import { generatePassword, generateSalt } from '../helper/auth';
import { IUser } from '../types/user';

export const createUser = async (req: Request, res: Response) => {
    const body = req.body;
    const salt = await generateSalt();
    const hashPassword = await generatePassword('P@ssw0rd', salt);
    const date = new Date();

    const q = 'INSERT INTO users (firstname, lastname, email, password, salt, create_at, update_at) VALUES (?, ?, ?, ?, ?, ?, ?)';
    db.query(q, [body.firstname, body.lastname, body.email, hashPassword, salt, date, date], (err) => {
        if (err) {
            res.status(500).json({ message: 'server error' });
        }
    });
    res.status(201).json({ message: 'created' });
};

export const getUsers = (req: Request, res: Response) => {
    const q = 'SELECT * FROM users';
    db.query(q, (err, data: any[]) => {
        if (err) {
            console.log('err', err);
            res.status(500);
        }
        if (data) {
            const json = data.map((row) => {
                console.log('row', row);
                return {
                    firstname: row.firstname,
                    lastname: row.lastname,
                    email: row.email,
                    role: row.role
                };
            });
            res.status(200).json({ message: 'success', data: json });
        }
    });
};
