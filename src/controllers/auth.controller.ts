import { Request, Response } from "express";
import { registerUser, loginUser } from "../services/auth.services";
import { AppError } from "../utils/generalError";
import { validate } from "../middleware/validation.middleware";
import { registerSchema, loginSchema } from "../validators/auth.validator";

export const register = async (req: Request, res: Response) => {
  try {
    const user = await registerUser(req.body);
    res
      .status(201)
      .json({ message: "Usuario creado", success: true, data: user });
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError("Error interno", 500);
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const result = await loginUser(req.body);
    res.json({ success: true, data: result });
  } catch (error) {
    if(error instanceof AppError) throw error;
    throw new AppError('Error interno', 500);
  }
};
