import { Request, Response } from 'express';
import { db } from '../config/database';
import { uploadImage } from '../helper/multer';
import { addProduct, getProductID, getProductList } from '../database/product';
import dayjs from 'dayjs';
import 'dayjs/locale/th';
import buddhistEra from 'dayjs/plugin/buddhistEra';

dayjs.extend(buddhistEra); // ใช้งาน buddhistEra plugin เพื่อแปลงเป็น พ.ศ.

export const getProducts = async (req: Request, res: Response) => {
    try {
        let data = await getProductList();

        const example = 'https://res.cloudinary.com/dvzib8cte/image/upload/v1668617479/OnlineStore/xfciiqzrfrkn1wajskt9.webp';

        data = data.map((item) => ({
            ...item,
            picture: example
        }));
        // data = data.map((row) => {
        //     return {
        //         ...row,
        //         created_at: dayjs(row.created_at).format('DD/MM/YYYY HH:mm:ss')
        //     };
        // });

        res.status(201).json({ message: 'success', data: data });
    } catch (error) {
        console.log(error);
    }
};

export const getProductById = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const data = await getProductID(id);

        res.status(200).json({ message: 'success', data: data });
    } catch (error) {
        res.status(500).json({ message: 'database failed' });
    }
};

export const createProduct = async (req: Request, res: Response) => {
    const body = req.body;
    // console.log('body', body);
    const date_now = new Date();
    const created_by = '1';

    try {
        // const { secure_url } = await uploadImage(body.image);
        // const image_name = secure_url.split('/').pop();

        let data = {
            id: 0,
            title: body.title,
            description: body.description,
            price: body.price,
            qty: body.qty,
            created_at: new Date(),
            created_by: created_by,
            updated_at: new Date(),
            updated_by: created_by
        };
        const productId = await addProduct(data);
        if (productId) {
            let dataReponse = {
                ...data,
                id: productId
            };
            res.status(201).json({ message: 'created', data: dataReponse });
        } else {
            res.status(500).json({ message: 'add product failed' });
        }
    } catch (error) {
        console.log(error);
    }
};
