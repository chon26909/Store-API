import { Request, Response } from "express";
import { IAuth } from "../types/auth";

export const handleLogin = (req: Request, res: Response) => {
  const { email, password, password_confirm }: IAuth = req.body;

  console.log(req.body);

  if (password !== password_confirm) {
    return res.status(400).json({ message: "รหัสผ่านไม่ถูกต้อง" });
  }

  res.status(200).json({ message: "เข้าสู่ระบบสำเร็จ" });
};
