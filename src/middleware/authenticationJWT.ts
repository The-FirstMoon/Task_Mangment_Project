import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { Payload } from "../features/auth/auth.type";

export const verfiyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  const secret = process.env.SECRET_KEY as string ;


  if (!authHeader?.startsWith("Bearer ")) {
    const error = new Error("Access denied. No token provided.");
    (error as any).status = 401;
    throw error;
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(
      token,
      secret
    ) as Payload;
    req.user = decoded;

    //console.log(typeof req.user.id, req.user)
    next();
  } catch (err) {
    const error = new Error("Invalid or expired token.");
    (error as any).status = 403;
    throw error;
  }
};

