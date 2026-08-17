import {Router} from 'express';
import {  verfiyToken } from '../../middleware/authenticationJWT';
import { deleteUser, getMe } from './user.controller';
import { requireRole } from '../../middleware/authenticationRole';
import { ROLE } from '../../utils/constants';

const router = Router();
/**
 * @swagger
 * /user/me:
 *   get:
 *     summary: Get the authenticated user's information
 *     responses:
 *       200:
 *         description: The user fetched successfully.
 */
router.get("/me" , verfiyToken, getMe);
/**
 * @swagger
 * /user/{id}:
 *   delete:
 *     summary: Delete user by id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: User ID
 *     responses:
 *       200:
 *         description: The user deleted successfully.
 */
router.delete("/:id", verfiyToken, requireRole(ROLE.ADMIN), deleteUser);

export default router;