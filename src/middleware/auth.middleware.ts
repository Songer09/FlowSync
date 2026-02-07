import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import { AppError } from "../utils/generalError";

interface JwtPayload {
    id: string;
    email: string;
}

declare global {
    namespace Express {
        interface Request {
            user?: JwtPayload;
        }
    }
}

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
    const auhtHeader = req.headers.authorization;

    if (!auhtHeader || !auhtHeader.startsWith('Bearer ')) {
        return next(new AppError('Token no proporcionado', 401));
    }

    const token = auhtHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
        req.user = decoded;
        next();
    } catch(error){
        return next(new AppError('Token inválido o expirado', 401));
    }
}