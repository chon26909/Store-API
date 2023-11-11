import express, { Router } from 'express';
import { createProduct, getProducts, getProductById } from '../controllers/productController';
import { handleAuthentication } from '../middleware/verifyHeader';

const router: Router = express.Router();

router.use(handleAuthentication);
router.get('/', getProducts);
router.get('/:id', getProductById);
router.post('/create', createProduct);

export default router;
