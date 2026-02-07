import { RegisterInput, LoginInput } from "../types/user.types";
import User from "../models/User";
import { AppError } from "../utils/generalError";
import jwt from 'jsonwebtoken';

export const registerUser = async (data: RegisterInput) => {
    const { username, email, password } = data;

    const existing = await User.findOne({ where: { email } });
    if(existing) throw new AppError('El correo ya está registrado', 409);

    const user = await User.create({ username, email, password });
    return { id: user.id, username: user.username, email: user.email };
};

export const loginUser = async (data: LoginInput) => {
    const { email, password } = data;

    const user = await User.findOne({ where: { email } });
    if(!user) throw new AppError('El correo no está registrado', 401);

    const isMatch = await user.comparePassword(password);
    if(!isMatch) throw new AppError('Credenciales Inválidas', 401);

    const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECTRET!,
        { expiresIn: '7d' }
    );

    return { token, user: {id: user.id, username: user.username, email: user.email } };
};