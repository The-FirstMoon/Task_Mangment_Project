import { NextFunction, Request, Response } from "express";


export const errorHandler = (err:any, req:Request, res:Response, next:NextFunction) =>{

    return res.status(err.status || 500).json({
        message: err.message || "Internal Server Error",
    });

}