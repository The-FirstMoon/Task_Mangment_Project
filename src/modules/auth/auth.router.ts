import { Router } from "express";
import { validate } from "../../middleware/validate";
import { authLoginSchema, authRegisterSchema } from "./auth.validator";
import { login, register } from "./auth.controller";


const router=Router()
router.post("/register", validate(authRegisterSchema),register)
router.post("/login", validate(authLoginSchema), login)


export default router;