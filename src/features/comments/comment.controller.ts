import { Request, Response } from "express";
import { addCommentDTO } from "./comment.dto";
import { TaskModel } from "../tasks/task.types";
import * as servieTask from "../tasks/task.service"
import { ProjectModel } from "../projects/project.type";
import * as servieProject from "../projects/project.service";
import { ROLE } from "../../utils/constants";
import { CommentModel } from "./comment.types";
import * as service from "../comments/comment.service"
import { AppError } from "../../utils/ApiError";

export const addComment =  async (req: Request<{}, {}, addCommentDTO>, res: Response) =>{
    const owner_id =  req.user!.id;
    const {text, task_id} = req.body;
    const newComment : addCommentDTO = {
        text: text,
        task_id: task_id,
        user_id: owner_id
    };
    const task : TaskModel = await servieTask.getTask(task_id);
    if(!task){
        throw new AppError("There is no task with this ID.", 404);
    }
    const project : ProjectModel = await servieProject.getProject(task.project_id, owner_id);
    if(req.user!.role === ROLE.USER && owner_id !== task.assigned_user_id && !project){
        throw new AppError("Forbidedn you arent admin, the owner of this task or assained by this task.", 403);
    }
    const comment : CommentModel =  await service.addComment(newComment);

    res.status(201).json({
        message: "The comment added successfully.",
        comment: comment
    })
}

export const getComments = async (req: Request, res: Response)=>{
    const owner_id : number = req.user!.id;
    //task id
    const {id} = req.params;
    const task : TaskModel = await servieTask.getTask(Number(id));
    if(!task){
        throw new AppError("There is no task with this ID.", 404);
    }

    // i checked with task assigned user id not with comment user_id bc if the owner_id was the commment user it will make comment user_id and task assighned id same 
    const project : ProjectModel = await servieProject.getProject(task.project_id, owner_id);
    if((task.assigned_user_id !== owner_id && !project) && req.user!.role !== ROLE.ADMIN){
        throw new AppError("Forbidedn you arent admin, the owner of this task or assained by this task.", 403);
    }
    const comments : CommentModel = await service.getComments(Number(id));
    res.status(200).json({
        message: "The comments fetched successfully.",
        comments: comments
    })
}

export const getComment =  async(req: Request, res: Response) =>{
    const onwer_id = req.user!.id;
    const {id} = req.params; //comment id

    const comment : CommentModel = await service.getComment(Number(id));
    if(!comment){
        throw new AppError("There is no comment with this ID.", 404);
    }

    const task : TaskModel = await servieTask.getTask(comment.task_id);
    const project : ProjectModel = await servieProject.getProject(task.project_id, onwer_id);
    //only one that can see comments are admins, onwer of the project and the task assighned 
    if(req.user!.role === ROLE.USER && !project && task.assigned_user_id !== onwer_id){
        throw new AppError("Forbidedn you arent admin, the owner of this task or assained by this task.", 403);
    }
    res.status(200).json({
        message: "The comment fetched successfully.",
        comment: comment
    })
}

