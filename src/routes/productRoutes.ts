import express, { Router } from 'express';
import { createProduct, getProducts, getProduct } from '../controllers/productController';
import { handleAuthentication } from '../middleware/verifyHeader';

const router: Router = express.Router();

router.use(handleAuthentication);
router.get('/', getProducts);
router.get('/:id', getProduct);
router.post('/create', createProduct);

export default router;
