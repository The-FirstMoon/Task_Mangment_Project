import { Request, Response } from "express";
import { editTaskDTO, TaskDTO } from "./task.dto";
import * as service from "./task.service";
import * as projectService from "../projects/project.service";
import { ProjectModel } from "../projects/project.type";
import { TaskMODEL } from "./task.types";
import { idParamsDTO, ROLE } from "../../utils/constants";

// when add a task u will be the owner of the project of this task, so u r nt the one who is gonna be doing the task
export const addTask = async (req: Request<{},{},TaskDTO>, res: Response) =>{
    const owner_id = req.user!.id;
    const task : TaskDTO = req.body;
    const project : ProjectModel = await projectService.getProject(task.projectId, owner_id);
    if(!project){
        const error = new Error("Forbidedn you arent the owner of this project.");
        (error as any).status = 403;
        throw error;
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

    const tasks : TaskMODEL[] = await service.getTasks(owner_id);

    res.status(200).json({
      message: "The tasks fetched successfully.",
      task: tasks,
    });
}


export const getTaskByAssaindUser = async (req: Request<idParamsDTO>, res: Response) =>{
    const owner_id = req.user!.id;
    const {id} = req.params;
    const task : TaskMODEL = await service.getTask(Number(id));
    //console.log(task.assigned_user_id)
    const project : ProjectModel = await projectService.getProject(task.project_id, owner_id);
    if((task.assigned_user_id !== owner_id && !project) && req.user!.role !== ROLE.ADMIN){
        const error = new Error("Forbidedn you arent admin, the owner of this task or assained by this task.");
        (error as any).status = 403;
        throw error;
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
     console.log( typeof req.user!.id)
    const oldTask : TaskMODEL = await service.getTask(Number(id));
    const project : ProjectModel= await projectService.getProject(oldTask.project_id, owner_id);
   
    if(req.user!.role !== ROLE.ADMIN && oldTask.assigned_user_id !== owner_id && !project){
        const error = new Error("Forbidedn you arent admin, the owner of this task or assained by this task.");
        (error as any).status = 403;
        throw error;
    }
    if(oldTask.assigned_user_id === owner_id){
        //the assagin user only can change the status only
        const newTask : editTaskDTO = {
            status: req.body.status,
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
    const task : TaskMODEL = await service.getTask(Number(id));
    if(!task){
        const error = new Error("This task id gone.");
        (error as any).status = 410;
        throw error;
    }
    const ogProject : ProjectModel= await projectService.getProject(task.project_id, owner_id);
    if(req.user!.role === ROLE.USER && !ogProject){
        const error = new Error("Forbidedn you arent admin, the owner of this task.");
        (error as any).status = 403;
        throw error;
    }
    await service.deleteTask(Number(id));
    res.status(200).json({
        message: "The task deleted successfully"
    })
}


