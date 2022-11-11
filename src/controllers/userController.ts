import console from 'console';
import { Request, Response } from 'express';
import { db } from '../config/database';
import { generatePassword, generateSalt } from '../helper/auth';
import { getUsersData, setUsersData } from '../redis/user';
import { IUser, ROLES_USER, USER_STATUS } from '../types/user';

export const createUser = async (req: Request, res: Response) => {
    const body = req.body;
    const salt = await generateSalt();
    const hashPassword = await generatePassword('P@ssw0rd', salt);
    const date = new Date();
    const user_status = USER_STATUS.ENABLE;
    const role = ROLES_USER.ADMIN;

    const q = ` INSERT INTO users (firstname, lastname, email, password, salt, user_status, role, create_at, update_at) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    db.query(q, [body.firstname, body.lastname, body.email, hashPassword, salt, user_status, role, date, date], (err) => {
        if (err) {
            res.status(500).json({ message: 'server error' });
        }
    });
    res.status(201).json({ message: 'created' });
};

export const getUsers = async (req: Request, res: Response) => {
    const redisData = await getUsersData();

    if (redisData) {
        res.status(200).json({ message: 'success', data: JSON.parse(redisData) });
    } else {
        const q = ` SELECT * FROM users`;
        db.query(q, (err, data: IUser[]) => {
            if (err) {
                console.log('err', err);
                res.status(500);
            }
            if (data.length > 0) {
                const json = data.map((row) => {
                    return {
                        id: row.id,
                        firstname: row.firstname,
                        lastname: row.lastname,
                        email: row.email,
                        role: row.role,
                        user_status: row.user_status
                    };
                });
                setUsersData(json);
                res.status(200).json({ message: 'success', data: json });
            }
        });
    }
};
