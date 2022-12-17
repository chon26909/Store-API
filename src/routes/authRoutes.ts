import express, { Router } from 'express';
import { handleLogin, handleLoginWithGoogle } from '../controllers/authController';
import { validateLogin } from '../middleware/auth';

const router: Router = express.Router();

router.post('/login', handleLogin);
router.post('/login-google', handleLoginWithGoogle);

export default router;
