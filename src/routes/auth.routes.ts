/**
 * @openapi
 * /auth/register:
 *   post:
 *     summary: Registrar nuevo usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuario creado
 */

import { Router } from "express";
import { register, login } from "../controllers/auth.controller";
import { validate } from "../middleware/validation.middleware";
import { registerSchema, loginSchema } from "../validators/auth.validator";

const router = Router();

router.post('/register', validate(registerSchema), register);
router.post('/login', validate(loginSchema), login);

export default router;