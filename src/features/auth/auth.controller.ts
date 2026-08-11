import { Request, Response } from "express";
import { loginDTO, registerDTO } from "./auth.dto";
import * as services from "./auth.service";
import { hashingPassword } from "../../utils/password";
import bcrypt from "bcrypt";
import { genrate_jwt } from "../../utils/jwt";
import { UserModel } from "../users/user.type";



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
    const error = new Error("Invalid email or password");
    (error as any).status = 401;
    throw error;
  }
  const ogPassword : string = User.password_hash;
  
  //const enteredPassword : string = await hashingPassword(req.body.password);
  //console.log(typeof ogPassword, ogPassword)
  const isVaildPassword : boolean = await bcrypt.compare(password,ogPassword);
  if(!isVaildPassword){
      const error = new Error("Invalid email or password");
      (error as any).status = 401;
      throw error;
  }
  const id : number= (await services.getUser(email)).id;
  type roleType = "USER" | "ADMIN"
  const role : roleType = (await services.getUser(email)).role;
  //console.log(typeof id, id )
  const token = genrate_jwt(id, email, role)

  res.status(200).json({
    message: "LogIn successfully.",
    token : token
  });
  
}