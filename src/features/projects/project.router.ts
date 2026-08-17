import { Router } from "express";
import { validate } from "../../middleware/validate";
import { verfiyToken } from "../../middleware/authenticationJWT";
import { projectAddProjectSchema, projectEditProjecttSchema } from "./project.validator";
import { addProject, deleteProject, editProject, getProject, getProjects } from "./project.controller";


const router = Router();
/**
 * @swagger
 * /project/:
 *   post:
 *     summary: Add new project
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: The project added successfully.
 */
router.post("/", validate(projectAddProjectSchema), verfiyToken, addProject);
/**
 * @swagger
 * /project/:
 *   get:
 *     summary: Get all project
 *     responses:
 *       200:
 *         description: The projects fetched successfully.
 */
router.get("/", verfiyToken, getProjects);
/**
 * @swagger
 * /project/{id}:
 *   get:
 *     summary: Get project by id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Project ID
 *     responses:
 *       200:
 *         description: The project fetched successfully.
 */
router.get("/:id", verfiyToken, getProject);
/**
 * @swagger
 * /project/{id}:
 *   patch:
 *     summary: Edit a project by id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Project ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: The project edited successfully.
 */
router.patch("/:id", validate(projectEditProjecttSchema), verfiyToken, editProject);
/**
 * @swagger
 * /project/{id}:
 *   delete:
 *     summary: Delete project by id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Project ID
 *     responses:
 *       200:
 *         description: The project deleted successfully.
 */
router.delete("/:id", verfiyToken,deleteProject)
export default router;