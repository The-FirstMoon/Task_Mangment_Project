import {Router} from 'express';
import {  verfiyToken } from '../../middleware/auth.middleware';

const router = Router();

router.get("/me" , verfiyToken,)

export default router;