import { JwtPayload } from "jsonwebtoken";
type role = "USER" | "ADMIN"
export interface Payload extends JwtPayload{
    email:string,
    role: role,
    id: number
};