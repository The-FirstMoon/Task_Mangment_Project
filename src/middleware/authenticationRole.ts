import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/ApiError";

export const requireRole = (role : string) => {
 return (req: Request, res: Response, next: NextFunction)=>{
    if(role !== req.user?.role){
        throw new AppError("Access denied. You are not Admin", 403);
    }
    next();
 }
}