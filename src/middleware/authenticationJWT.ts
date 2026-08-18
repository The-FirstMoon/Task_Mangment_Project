// import { Request, Response, NextFunction } from "express";
// import jwt, { JwtPayload } from "jsonwebtoken";
// import { Payload } from "../features/auth/auth.type";
// import { ROLE } from "../utils/constants";

// export const verfiyToken = (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   const authHeader = req.headers.authorization;
//   const secret = process.env.SECRET_KEY || "";


//   if (!authHeader?.startsWith("Bearer ")) {
//     const error = new Error("Access denied. No token provided.");
//     (error as any).status = 401;
//     throw error;
//   }

//   const token = authHeader.split(" ")[1];

//   try {
//     const decoded = jwt.verify(
//       token,
//       secret
//     ) as Payload;
//     decoded.id = Number(decoded.id);
//     req.user = decoded;

//     //console.log(typeof req.user.id, req.user)
//     next();
//   } catch (err) {
//     const error = new Error("Invalid or expired token.");
//     (error as any).status = 403;
//     throw error;
//   }
// };

import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { Payload } from "../features/auth/auth.type";
import { AppError } from "../utils/AppError";
import { ROLE } from "../utils/constants";

const isPayload = (payload: string | jwt.JwtPayload): payload is Payload => {
  return (
    typeof payload !== "string" &&
    typeof payload.id === "number" &&
    typeof payload.email === "string" &&
    Object.values(ROLE).includes(payload.role as ROLE)
  );
};

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  const secret = process.env.SECRET_KEY;

  if (!secret) {
    throw new Error("JWT secret is not configured.");
  }

  if (!authHeader?.startsWith("Bearer ")) {
    throw new AppError("Access denied. No token provided.", 401);
  }

  const token = authHeader.slice(7);

  try {
    const decoded = jwt.verify(token, secret);
    if (!isPayload(decoded)) {
      throw new AppError("Invalid token payload.", 403);
    }
    req.user = decoded;
    next();
  } catch (err) {
    if (err instanceof AppError) {
      throw err;
    }

    throw new AppError("Invalid or expired token.", 403);
  }
};