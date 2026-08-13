import { Router } from "express";
import { verfiyToken } from "../../middleware/authenticationJWT";
import { validate } from "../../middleware/validate";
import { taskAddTaskSchema, taskEditTaskSchema } from "./task.validator";
import { addTask, deleteTask, editTask, getTaskAuthorized, getTasks } from "./task.controller";

const router= Router()

router.post("/", verfiyToken, validate(taskAddTaskSchema), addTask);
router.get("/", verfiyToken, getTasks);
router.get("/:id", verfiyToken, getTaskAuthorized);
//router.get("/:id", verfiyToken, getTasksByProjectId)

router.patch("/:id", verfiyToken, validate(taskEditTaskSchema), editTask);
router.delete("/:id", verfiyToken, deleteTask);

export default router;