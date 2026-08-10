import jwt, { Secret, JwtPayload } from 'jsonwebtoken';


export const genrate_jwt = (id : number, email : string)=>{
    const secret = process.env.SECRET_KEY as string ;
    const token = jwt.sign({ id: id!.toString(), email: email }, secret/*, {
       expiresIn: '60 * 60',
    }*/);
    return token;
}