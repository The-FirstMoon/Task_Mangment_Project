import {Router} from "express";
import { verfiyToken } from "../../middleware/authenticationJWT";
import { validate } from "../../middleware/validate";
import { addCommentSchema, editCommentSchema } from "./comment.validator";
import { addComment, getComment, getComments } from "./comment.controller";

const router = Router();

router.post("/", verfiyToken, validate(addCommentSchema), addComment);
router.get("/task/:id", verfiyToken, getComments);
router.get("/:id", verfiyToken, getComment);

router.patch("/:id", verfiyToken, validate(editCommentSchema), editComment);
router.delete("/:id", verfiyToken, deleteComment);

export default  router;