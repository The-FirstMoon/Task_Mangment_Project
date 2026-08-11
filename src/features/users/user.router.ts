import {Router} from 'express';
import {  verfiyToken } from '../../middleware/authenticationJWT';
import { deleteUser, getMe } from './user.controller';
import { requireRole } from '../../middleware/authenticationRole';
import { ROLE } from '../../utils/constants';

const router = Router();

router.get("/me" , verfiyToken, getMe);
router.delete("/:id", verfiyToken, requireRole(ROLE.ADMIN), deleteUser);

export default router;