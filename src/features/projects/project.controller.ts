import { Request, Response } from "express";
import { editPrjectDTO,prjectDTO } from "./project.dto";
import { ProjectModel } from "./project.type";
import * as service from "./project.service"
import *  as userService from "../auth/auth.service";
import { ROLE, idParamsDTO } from "../../utils/constants";
import { AppError } from "../../utils/ApiError";


export const addProject = async (req: Request<{},{}, prjectDTO>, res: Response) => {
    const owner_id = req.user!.id;
    //const {name, description} = req.body;

    const newProject : ProjectModel = await service.addProject(req.body, owner_id)

    res.status(201).json({
      message: "The project added successfully.",
      project: newProject,
    });
}

export const getProjects = async (req: Request, res: Response) => {
    const owner_id = req.user!.id;
    const projects : ProjectModel[] = await service.getProjects(owner_id);
    
    res.status(200).json({
        message: "The projects fetched successfully.",
        projects: projects
    });
    //res.status(200).json(projects);
}

export const getProject = async (req: Request<idParamsDTO>, res: Response) => {
    const {id} = req.params;
    const owner_id = req.user!.id;
    const project : ProjectModel = await service.getProject(Number(id), owner_id);
    if(!project && req.user!.role === ROLE.USER){
        throw new AppError("Forbidedn you arent the owner of this project or admin.", 403);
    }
    res.status(200).json({
        message: "The project fetched successfully.",
        project: project
    })
}

export const editProject = async (req: Request<idParamsDTO,{}, editPrjectDTO>, res: Response) => {
    const {id} = req.params;
    const owner_id = req.user!.id;
    const userRole : string = (await userService.getUser(req.user!.email)).role;
    const safeCheckProject : ProjectModel = await service.getProject(Number(id), owner_id);
    if(!safeCheckProject && userRole === ROLE.USER){
        throw new AppError("Forbidedn you arent admin nor the owner of this project.", 403);
    }
    const project : ProjectModel = await service.editProject(Number(id), req.body);
    res.status(200).json({
        message: "The project edited successfully",
        project: project
    })
}

export const deleteProject = async (req: Request<idParamsDTO>, res: Response) =>{
    const {id}= req.params;
    const owner_id= req.user!.id;
    const userRole : string = (await userService.getUser(req.user!.email)).role;
    const safeCheckProject : ProjectModel = await service.getProject(Number(id), owner_id);
    if(!safeCheckProject && userRole === ROLE.USER){
        throw new AppError("Forbidedn you arent admin nor the owner of this project.", 403);
    }

    await service.deleteProject(Number(id));
     res.status(200).json({
        message: "The project deleted successfully"
    })
}