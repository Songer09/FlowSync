import { NextFunction, Request, Response } from "express";
import { ZodObject, ZodRawShape } from 'zod';
import { AppError } from "../utils/generalError";

export const validate = (schema: ZodObject<ZodRawShape>) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            schema.parse(req.body);
            next();
        } catch (error: any) {
            next(new AppError(`Validación Fallida: ${error.errors[0].message}`, 400));
        }
    };
};
