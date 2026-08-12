import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { Payload } from "../features/auth/auth.type";
import { ROLE } from "../utils/constants";

export const verfiyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  const secret = process.env.SECRET_KEY || "";


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
    decoded.id = Number(decoded.id);
    req.user = decoded;

    //console.log(typeof req.user.id, req.user)
    next();
  } catch (err) {
    const error = new Error("Invalid or expired token.");
    (error as any).status = 403;
    throw error;
  }
};

