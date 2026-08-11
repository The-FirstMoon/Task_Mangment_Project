import { NextFunction, Request, Response } from "express";

export const requireRole = (role : string) => {
 return (req: Request, res: Response, next: NextFunction)=>{
    if(role !== req.user?.role){
        const error = new Error(`Access denied. You are not ${role}`);
        (error as any).status = 403;
        throw error;
    }
    next();
 }
}