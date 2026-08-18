import { Request, Response } from "express";
import { loginDTO, registerDTO } from "./auth.dto";
import * as services from "./auth.service";
import { hashingPassword } from "../../utils/password";
import bcrypt from "bcrypt";
import { generateJWT } from "../../utils/jwt";
import { UserModel } from "../users/user.type";
import { AppError } from "../../utils/AppError";
import { ROLE } from "../../utils/constants";



export const register = async (req:Request<{},{},registerDTO> , res:Response)=>{
  
    const hashedPassword : string = await hashingPassword(req.body.password)
    const newRegister = await services.addUser(req.body,hashedPassword);
    
    res.status(201).json({
      message: "The register added successfully.",
      resgister: newRegister,
    });
}

export const login = async (req:Request<{},{},loginDTO>, res:Response)=>{
  const {password, email}= req.body
  const User : UserModel = await services.getUser(email)
  if (!User) {
    throw new AppError("Invalid email or password", 401);
  }
  const ogPassword : string = User.password_hash;
  
  //const enteredPassword : string = await hashingPassword(req.body.password);
  //console.log(typeof ogPassword, ogPassword)
  const isVaildPassword : boolean = await bcrypt.compare(password,ogPassword);
  if(!isVaildPassword){
    throw new AppError("Invalid email or password", 401);
  }
  const id : number= (await services.getUser(email)).id;
  const role : ROLE = (await services.getUser(email)).role;
  //console.log(typeof id, id )
  const token = generateJWT(id, email, role)

  res.status(200).json({
    message: "LogIn successfully.",
    token : token
  });
  
}