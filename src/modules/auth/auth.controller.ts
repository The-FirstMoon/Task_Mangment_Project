import { Request, Response } from "express";
import { loginDTO, registerDTO } from "./auth.dto";
import * as services from "./auth service";
import { hashingPassword } from "../../utils/password";
import bcrypt from "bcrypt";
import { genrate_jwt } from "../../utils/jwt";



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
  const ogPassword : string = (await services.getUser(email)).password_hash;
  if (!ogPassword) {
    const error = new Error("Invalid email or password");
    (error as any).status = 401;
    throw error;
  }
  //const enteredPassword : string = await hashingPassword(req.body.password);
  //console.log(typeof ogPassword, ogPassword)
  const isVaildPassword : boolean = await bcrypt.compare(password,ogPassword);
  if(!isVaildPassword){
      const error = new Error("Invalid email or password");
      (error as any).status = 401;
      throw error;
  }
  const id : number= (await services.getUser(email)).id;
  console.log(typeof id, id )
  const token = genrate_jwt(id, email)

  res.status(200).json({
    message: "LogIn successfully.",
    token : token
  });
  
}