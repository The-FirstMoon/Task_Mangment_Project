import bcrypt from 'bcrypt';


export const hashingPassword =async (password : string) =>{
    const saltRound : number = Number(process.env.SALTROUNDS)
    const hashedPassword= await bcrypt.hash(password,saltRound);
    return hashedPassword;
}