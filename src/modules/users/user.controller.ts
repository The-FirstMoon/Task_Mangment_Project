import { Request, Response } from "express";
import * as services from "./user.service";

export const getMe = async (req:Request,res:Response)=>{
    const userId = req.user!.id
    const user = await services.findById(userId);
        if (!user) {
            const error = new Error("User not found.");
            (error as any).status = 404;
            throw error;
        }
          res.status(200).json({
            message: "User fetched successfully",
            User : user
        });
}