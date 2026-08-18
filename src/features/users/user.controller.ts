import { Request, RequestParamHandler, Response } from "express";
import * as services from "./user.service";
import { deleteParamsDTO } from "./user.dto";
import { AppError } from "../../utils/AppError";
import { UserModel } from "./user.type";

export const getMe = async (req:Request,res:Response)=>{
    const userId = req.user!.id
    const user = await services.findById(userId);
    if (!user) {
        throw new AppError("User not found.", 404);
    }
    res.status(200).json({
        message: "User fetched successfully",
        User : user
    });
}

export const deleteUser  = async(req: Request<deleteParamsDTO>, res: Response) => {
    
    const {id} = req.params;
    await services.deleteUser(Number(id));
    res.status(200).json({
      message: "Student deleted successfully.",
    });
}
