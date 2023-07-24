import { Request, Response } from 'express';
import { db } from '../config/database';
import { uploadImage } from '../helper/multer';
import { addProduct, getProductID, getProductList } from '../database/product';

export const getProducts = async (req: Request, res: Response) => {
    try {
        const productList = await getProductList();

        console.log('productList: ' + productList);

        res.status(201).json({ message: 'success', data: productList });
    } catch (error) {
        console.log(error);
    }
};

export const getProduct = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const product = await getProductID(id);
    } catch (error) {}
};

export const createProduct = async (req: Request, res: Response) => {
    const body = req.body;
    // console.log('body', body);
    const date_now = new Date();
    const created_by = '1';

    try {
        // const { secure_url } = await uploadImage(body.image);
        // const image_name = secure_url.split('/').pop();

        const data = {
            name: body.name,
            description: body.description,
            price: body.price,
            qty: body.qty,
            image: '' as string,
            created_at: date_now,
            created_by: created_by,
            updated_at: date_now,
            updated_by: created_by
        };
        const created = await addProduct(data);
        if (created) {
            res.status(201).json({ message: 'created' });
        }
    } catch (error) {
        console.log(error);
    }
};
