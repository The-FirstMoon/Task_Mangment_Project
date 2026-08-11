import { Router } from "express";
import { validate } from "../../middleware/validate";
import { verfiyToken } from "../../middleware/authenticationJWT";
import { projectAddProjectSchema, projectEditProjecttSchema } from "./project.validator";
import { addProject, deleteProject, editProject, getProject, getProjects } from "./project.controller";


const router = Router();

router.post("/", validate(projectAddProjectSchema), verfiyToken, addProject);
router.get("/", verfiyToken, getProjects);
router.get("/:id", verfiyToken, getProject);
router.patch("/:id", validate(projectEditProjecttSchema), verfiyToken, editProject);
router.delete("/:id", verfiyToken,deleteProject)
export default router;