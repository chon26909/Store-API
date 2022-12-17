import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { RowDataPacket } from 'mysql2';
import { db } from '../config/database';
import { validatePassword } from '../helper/auth';
import { IAuth } from '../types/auth';

export const handleLogin = (req: Request, res: Response) => {
    const { email, password }: IAuth = req.body;

    if (!email && !password) {
        return res.status(400).json({ message: 'โปรดกรอกอีเมล และรหัสผ่าน ให้ครบถ้วน' });
    }

    const q = 'SELECT email, password, salt FROM users WHERE email = ?';

    db.query(q, [email], async (err, rows: any[]) => {
        if (err) {
            console.log('err', err);
        }

        if (rows.length > 0) {
            const [user] = rows;
            const valid = await validatePassword(password, user.password, user.salt);

            if (valid) {
                const token = jwt.sign({ uid: user.id }, process.env.JWT_SECRET!);
                return res.status(200).json({ message: 'success', token });
            } else {
                return res.status(400).json({ message: 'รหัสผ่านไม่ถูกต้อง' });
            }
        }

        return res.status(400).json({ message: 'ไม่พบอีเมลนี้ในระบบ' });
    });
};

export const handleLoginWithGoogle = () => {};
