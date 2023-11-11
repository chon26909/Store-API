import { OkPacket, RowDataPacket } from 'mysql2';
import { db } from '../config/database';
import { IProduct } from '../types/product';

interface IProductList extends IProduct, RowDataPacket {
    // id: number;
    // title: string;
    // description: string;
    // price: number;
    // qty: number;
    // created_at: string;
    // created_by: string;
    // updated_at: string;
    // updated_by: string;
}

interface IAddProduct {
    title: string;
    description: string;
    price: number;
    qty: number;
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
    return new Promise<number>((resolve, reject) => {
        db.query<OkPacket>(
            'INSERT INTO products (title, description, price, qty, created_at, created_by, updated_at, updated_by) VALUES(?, ?, ?, ?, ?, ?, ?, ?)',
            [data.title, data.description, data.price, data.qty, data.created_at, data.created_by, data.updated_at, data.updated_by],
            (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    if (res.insertId) {
                        resolve(res.insertId);
                    }
                }
            }
        );
    });
};
