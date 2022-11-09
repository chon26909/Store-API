import express, { Router } from 'express';
import { createUser } from '../controllers/userController';

const router: Router = express.Router();
router.post('/create', createUser);

export default router;
