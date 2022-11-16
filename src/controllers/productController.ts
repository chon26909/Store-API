import { Request, Response } from 'express';
import { db } from '../config/database';
import { uploadImage } from '../helper/multer';

export const getProducts = (req: Request, res: Response) => {
    const query = 'SELECT * FROM products';
    db.query(query, (err, rows: []) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ message: 'Server error' });
        }
        const data = rows.map((row: any) => ({
            id: row.id,
            name: row.name,
            description: row.description,
            price: row.price,
            qty: row.qty,
            picture: process.env.CLOUDINARY_PUBLIC_URL + row.picture
        }));
        res.status(201).json({ message: 'success', data });
    });
};
export const createProduct = async (req: Request, res: Response) => {
    const data = req.body;
    console.log('data', data);
    const date_now = new Date();
    const create_by = '1';

    try {
        const { secure_url } = await uploadImage(data.picture);
        const picture_name = secure_url.split('/').pop();
        const q = ` INSERT INTO products (name, description, price, qty, picture, create_by, create_at) 
                VALUES (?,?,?,?,?,?,?)`;
        db.query(q, [data.name, data.description, data.price, data.qty, picture_name, create_by, date_now], (err) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ message: 'Server error' });
            }
        });
    } catch (error) {
        console.log(error);
    }

    res.status(201).json({ message: 'created' });
};
