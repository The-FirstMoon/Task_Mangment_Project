import {Router} from "express";
import { verifyToken } from "../../middleware/authenticationJWT";
import { validate } from "../../middleware/validate";
import { addCommentSchema, editCommentSchema } from "./comment.validator";
import { addComment, deleteComment, editComment, getComment, getComments } from "./comment.controller";

const router = Router();
/**
 * @swagger
 * /comment:
 *   post:
 *     summary: Add a new comment
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - text
 *               - task_id
 *             properties:
 *               text:
 *                 type: string
 *               task_id:
 *                 type: integer
 *     responses:
 *       201:
 *         description: The comment was added successfully.
 *       403:
 *         description: User is not authorized to comment on this task.
 *       404:
 *         description: Task not found.
 */
router.post("/", verifyToken, validate(addCommentSchema), addComment);
/**
 * @swagger
 * /comment/task/{id}:
 *   get:
 *     summary: Get all comments for a task
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Task ID
 *     responses:
 *       200:
 *         description: The comments were fetched successfully.
 *       403:
 *         description: User is not authorized to view these comments.
 *       404:
 *         description: Task not found.
 */
router.get("/task/:id", verifyToken, getComments);
/**
 * @swagger
 * /comment/{id}:
 *   get:
 *     summary: Get a comment by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Comment ID
 *     responses:
 *       200:
 *         description: The comment was fetched successfully.
 *       403:
 *         description: User is not authorized to view this comment.
 *       404:
 *         description: Comment not found.
 */
router.get("/:id", verifyToken, getComment);
/**
 * @swagger
 * /comment/{id}:
 *   patch:
 *     summary: Edit a comment
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Comment ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *     responses:
 *       200:
 *         description: The comment was edited successfully.
 *       403:
 *         description: User is not authorized to edit this comment.
 *       404:
 *         description: Comment not found.
 */
router.patch("/:id", verifyToken, validate(editCommentSchema), editComment);
/**
 * @swagger
 * /comment/{id}:
 *   delete:
 *     summary: Delete comment by id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Comment ID
 *     responses:
 *       200:
 *         description: The comment deleted successfully.
 */
router.delete("/:id", verifyToken, deleteComment);

export default  router;