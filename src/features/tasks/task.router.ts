import { Router } from "express";
import { verfiyToken } from "../../middleware/authenticationJWT";
import { validate } from "../../middleware/validate";
import { taskAddTaskSchema, taskEditTaskSchema } from "./task.validator";
import { addTask, deleteTask, editTask, getTaskAuthorized, getTasks } from "./task.controller";

const router= Router()
/**
 * @swagger
 * /task/:
 *   post:
 *     summary: Add new task
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               status:
 *                 type: string
 *               prioprity:
 *                 type: string
 *               assignedUserId:
 *                 type: integer
 *               projectId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: The task added successfully.
 */
router.post("/", verfiyToken, validate(taskAddTaskSchema), addTask);
/**
 * @swagger
 * /task/:
 *   get:
 *     summary: Get all tasks
 *     responses:
 *       200:
 *         description: The tasks fetched successfully.
 */
router.get("/", verfiyToken, getTasks);
/**
 * @swagger
 * /task/{id}:
 *   get:
 *     summary: Get task by id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Task ID
 *     responses:
 *       200:
 *         description: The task fetched successfully.
 */
router.get("/:id", verfiyToken, getTaskAuthorized);
//router.get("/:id", verfiyToken, getTasksByProjectId)

/**
 * @swagger
 * /task/{id}:
 *   patch:
 *     summary: Edit a task by id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Task ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               status:
 *                 type: string
 *               prioprity:
 *                 type: string
 *               assignedUserId:
 *                 type: integer
 *               projectId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: The task edited successfully.
 */
router.patch("/:id", verfiyToken, validate(taskEditTaskSchema), editTask);
/**
 * @swagger
 * /task/{id}:
 *   delete:
 *     summary: Delete task by id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Task ID
 *     responses:
 *       200:
 *         description: The task deleted successfully.
 */
router.delete("/:id", verfiyToken, deleteTask);

export default router;