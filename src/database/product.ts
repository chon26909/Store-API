import { OkPacket, RowDataPacket } from 'mysql2';
import { db } from '../config/database';

interface IProductList extends RowDataPacket {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
    created_at: Date;
    created_by: string;
    updated_at: Date;
    updated_by: string;
}

interface IAddProduct {
    name: string;
    description: string;
    price: number;
    qty: number;
    image: string;
    created_at: Date;
    created_by: string;
    updated_at: Date;
    updated_by: string;
}

export const getProductList = () => {
    return new Promise<IProductList[]>((resolve, reject) => {
        db.query<IProductList[]>('SELECT * FROM products', (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};

export const getProductID = (id: string) => {
    return new Promise<IProductList>((resolve, reject) => {
        db.query<IProductList[]>('SELECT * FROM products WHERE id = ?', [id], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result[0]);
            }
        });
    });
};

export const addProduct = (data: IAddProduct) => {
    return new Promise<boolean>((resolve, reject) => {
        db.query<OkPacket>(
            'INSERT INTO products (name, description, price, qty, image, created_at, created_by, updated_at, updated_by) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [data.name, data.description, data.price, data.qty, data.image, data.created_at, data.created_by, data.updated_at, data.updated_by],
            (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    if (res.insertId) {
                        resolve(true);
                    }
                }
            }
        );
    });
};
