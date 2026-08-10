// import { Request, Response, NextFunction } from 'express';
// import jwt from 'jsonwebtoken';

// export const authenticate = (req: Request, res: Response, next: NextFunction)=> {
//   const authHeader = req.headers.authorization;

//   if (!authHeader?.startsWith('Bearer ')) {
//     res.status(401).json({ error: 'Access denied. No token provided.' });
//     return;
//   }

//   const token = authHeader.split(' ')[1];

//   try {
//     const decoded = jwt.verify(token, process.env.SECRET_KEY as string);
//     req.user= decoded; 
//     next(); 
//   } catch (error) {
//     res.status(403).json({ error: 'Invalid or expired token.' });
//   }
// };

import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { Payload } from "../modules/auth/auth.type";

export const verfiyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    const error = new Error("Access denied. No token provided.");
    (error as any).status = 401;
    throw error;
  }

  const token = authHeader.split(" ")[1];
    //console.log(typeof token, token)
    // const decoded = jwt.verify(
    //   token,
    //   process.env.SECRET_KEY as string
    // );
    // console.log(typeof decoded, decoded)
  try {
    const decoded = jwt.verify(
      token,
      process.env.SECRET_KEY as string
    ) as Payload;
    req.user = decoded;

    console.log(typeof req.user.id, req.user)
    next();
  } catch (err) {
    const error = new Error("Invalid or expired token.");
    (error as any).status = 403;
    throw error;
  }
};