import { Request, Response } from "express";

export const createUser = (req: Request, res: Response) => {
  const body = req.body;

  res.status(201).json({ message: "created" });
};
