import { z } from 'zod'

export const registerSchema = z.object({
    username: z.string().min(3).max(50),
    email: z.email(),
    password: z.string().min(6).max(100),
});

export const loginSchema = z.object({
    username: z.email(),
    password: z.string().min(1),
})