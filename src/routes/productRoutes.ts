import express, { Router } from 'express';
import { db } from '../config/database';
import { createProduct, getProducts } from '../controllers/productController';
import { handleAuthentication } from '../middleware/verifyHeader';

const router: Router = express.Router();

router.use(handleAuthentication);
router.get('/', getProducts);
router.post('/create', createProduct);

export default router;
