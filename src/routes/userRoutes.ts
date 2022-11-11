import express, { Router } from 'express';
import { createUser, getUsers } from '../controllers/userController';

const router: Router = express.Router();
router.get('/', getUsers);
router.post('/create', createUser);

export default router;
