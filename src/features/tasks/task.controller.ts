import { Request, Response } from "express";
import { editTaskDTO, TaskDTO } from "./task.dto";
import * as service from "./task.service";
import * as projectService from "../projects/project.service";
import { ProjectModel } from "../projects/project.type";
import { TaskModel } from "./task.types";
import { idParamsDTO, ROLE } from "../../utils/constants";
import { AppError } from "../../utils/AppError";

// when add a task u will be the owner of the project of this task, so u r nt the one who is gonna be doing the task
export const addTask = async (req: Request<{},{},TaskDTO>, res: Response) =>{
    const owner_id = req.user!.id;
    const task : TaskDTO = req.body;
    const project : ProjectModel = await projectService.getProject(task.projectId, owner_id);
    if(!project){
        throw new AppError("Forbidedn you arent the owner of this project.", 403);
    }
    const newTask = await service.addTask(task);

    res.status(201).json({
      message: "The task added successfully.",
      task: newTask,
    });
}

// while if u want to fetch a task the owner_id will be the who assighend to the task too
export const getTasks = async (req: Request,  res: Response) => {
    const owner_id = req.user!.id;

    const tasks : TaskModel[] = await service.getTasks(owner_id);

    res.status(200).json({
      message: "The tasks fetched successfully.",
      tasks: tasks,
    });
}


export const getTaskAuthorized = async (req: Request<idParamsDTO>, res: Response) =>{
    const owner_id = req.user!.id;//user id
    const {id} = req.params; //task id
    const task : TaskModel = await service.getTask(Number(id));
    if(!task){
        throw new AppError("There is no task with this ID.", 404);        
    }
    //console.log(task.assigned_user_id)
    const project : ProjectModel = await projectService.getProject(task.project_id, owner_id);
    if((task.assigned_user_id !== owner_id && !project) && req.user!.role !== ROLE.ADMIN){
        throw new AppError("Forbidedn you arent admin, the owner of this task or assained by this task.", 403);
    }
    res.status(200).json({
      message: "The task fetched successfully.",
      task: task,  
    })
}

//export const getTasksByProjectId = async ()

export const editTask = async (req: Request<idParamsDTO,{},editTaskDTO>, res: Response) =>{
    const owner_id = req.user!.id;
    const {id} = req.params;
    const oldTask : TaskModel = await service.getTask(Number(id));
    if(!oldTask){
        throw new AppError("There is no task with this ID.", 404);
    }
    const project : ProjectModel= await projectService.getProject(oldTask.project_id, owner_id);
   
    if(req.user!.role !== ROLE.ADMIN && oldTask.assigned_user_id !== owner_id && !project){
        throw new AppError("Forbidedn you arent admin, the owner of this task or assained by this task.", 403);
    }
    //check if the editer is an admin or owner of the project  if not he will be assaigned user so only can edit status
    if( req.user!.role===ROLE.USER && project.owner_id!==owner_id ){
        //the assagin user only can change the status only
        const newTask : editTaskDTO = {
            status: req.body.status
        }
        const editedTask = await service.editTask(Number(id), newTask);
        return res.status(200).json({
            message: "The task edited successfully as assaigned.",
            task: editedTask,  
        })
    }
    const newTask : editTaskDTO = req.body;
    const editedTask = await service.editTask(Number(id), newTask);
    return res.status(200).json({
      message: "The task edited successfully as owner.",
      task: editedTask,  
    })
}
// the only one can delete a task is the owner of the og project 
export const deleteTask = async (req: Request<idParamsDTO>, res: Response) =>{
    const owner_id : number= req.user!.id;
    const {id}  = req.params;
    const task : TaskModel = await service.getTask(Number(id));
        if(!task){
            throw new AppError("This task id gone.", 410);
        }
    const ogProject : ProjectModel= await projectService.getProject(task.project_id, owner_id);
    if(req.user!.role === ROLE.USER && !ogProject){
        throw new AppError("Forbidedn you arent admin or the owner of this task.", 403);
    }
    await service.deleteTask(Number(id));
    res.status(200).json({
        message: "The task deleted successfully"
    })
}


