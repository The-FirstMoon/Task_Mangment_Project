import jwt from 'jsonwebtoken';

type roleType = "USER" | "ADMIN"
export const genrate_jwt = (id : number, email : string, role : roleType)=>{
    const secret = process.env.SECRET_KEY as string ;
    console.log(typeof id, id)
    const token = jwt.sign({ id: id, email: email, role: role }, secret/*, {
       expiresIn: '60 * 60',
    }*/);
    return token;
}