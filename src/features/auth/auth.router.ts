import { Router } from "express";
import { validate } from "../../middleware/validate";
import { authLoginSchema, authRegisterSchema } from "./auth.validator";
import { login, register } from "./auth.controller";


const router=Router()
/**
 * @swagger
 * /auth/register:
 *   post:
 *     security: []
 *     summary: Register a new account
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - password
 *               - confirmPassword
 *               - email
 *               - role
 *             properties:
 *               name:
 *                 type: string
 *               password:
 *                 type: string
 *                 format: password
 *               confirmPassword:
 *                 type: string
 *                 format: password
 *               email:
 *                 type: string
 *                 format: email
 *               role:
 *                 type: string
 *     responses:
 *       201:
 *         description: The account was registered successfully.
 *       400:
 *         description: Validation error.
 */
router.post("/register", validate(authRegisterSchema),register);
/**
 * @swagger
 * /auth/login:
 *   post:
 *     security: []
 *     summary: Log in to an account
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - password
 *               - email
 *             properties:
 *               password:
 *                 type: string
 *                 format: password
 *               email:
 *                 type: string
 *                 format: email
 *     responses:
 *       200:
 *         description: Login successful.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: LogIn successfully.
 *                 token:
 *                   type: string
 *                   description: JWT authentication token.
 *       401:
 *         description: Invalid email or password.
 */
router.post("/login", validate(authLoginSchema), login)


export default router;