import console from 'console';
import { Request, Response } from 'express';
// import { db } from '../config/database';
import { generatePassword, generateSalt } from '../helper/auth';
import { getUsersData } from '../redis/user';
import { ROLES_USER, USER_STATUS } from '../types/user';
import { v4 as uuidv4 } from 'uuid';
import { addUser } from '../database/user';

export const createUser = async (req: Request, res: Response) => {
    const body = req.body;

    const salt = await generateSalt();
    const hashPassword = await generatePassword(body.password, salt);

    const date = new Date();
    const user_status = USER_STATUS.ENABLED;
    const role = ROLES_USER.ADMIN;
    const id = uuidv4();

    try {
        const data = {
            id: id,
            firstname: body.firstname,
            lastname: body.lastname,
            email: body.email,
            hash: hashPassword,
            salt: salt,
            user_status: user_status,
            role: role,
            created_at: date,
            updated_at: date
        };

        const created = await addUser(data);
        if (created) {
            res.status(201).json({ message: 'created' });
        }
    } catch (error) {
        console.log('error', error);
    }

    // const q = ` INSERT INTO users (id, firstname, lastname, email, password, salt, user_status, role, create_at, update_at)
    //             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    // db.query(q, [id, body.firstname, body.lastname, body.email, hashPassword, salt, user_status, role, date, date], (err) => {
    //     if (err) {
    //         res.status(500).json({ message: 'server error' });
    //     }
    // });
};

export const getUsers = async (req: Request, res: Response) => {
    const redisData = await getUsersData();

    if (redisData) {
        res.status(200).json({ message: 'success', data: JSON.parse(redisData) });
    } else {
        // const q = ` SELECT * FROM users`;
        // db.query(q, (err, data: IUser[]) => {
        //     if (err) {
        //         console.log('err', err);
        //         res.status(500);
        //     }
        //     if (data.length > 0) {
        //         const json = data.map((row) => {
        //             return {
        //                 id: row.id,
        //                 firstname: row.firstname,
        //                 lastname: row.lastname,
        //                 email: row.email,
        //                 role: row.role,
        //                 user_status: row.user_status
        //             };
        //         });
        //         setUsersData(json);
        //         res.status(200).json({ message: 'success', data: json });
        //     }
        // });
    }
};
