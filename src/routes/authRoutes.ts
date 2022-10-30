import express, { Router } from "express";
import { handleLogin } from "../controllers/authController";

const router: Router = express.Router();

router.post("/login", handleLogin);

export default router;
