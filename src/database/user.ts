import { OkPacket } from 'mysql2';
import { db } from '../config/database';

interface IAddUser {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
    hash: string;
    salt: string;
    user_status: string;
    role: string;
    created_at: Date;
    updated_at: Date;
}

export const addUser = (data: IAddUser) => {
    return new Promise<boolean>((resolve, reject) => {
        const q = ` INSERT INTO users (id, firstname, lastname, email, password, salt, user_status, role, created_at, updated_at) 
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        db.query<OkPacket>(q, [data.id, data.firstname, data.lastname, data.email, data.hash, data.salt, data.user_status, data.role, data.created_at, data.updated_at], (err, result) => {
            if (err) {
                reject(err);
            } else {
                if (result.insertId) {
                    resolve(true);
                }
            }
        });
    });
};
