import pool from "../../config/db";
import { UserModel } from "../users/user.type";
import { registerDTO } from "./auth.dto";

export const addUser = async (newRegister : registerDTO,hashedPassword : string) : Promise<UserModel> =>{
    const{
        name,
        email,
        role
    } = newRegister
    const result = await pool.query<UserModel>(`
        INSERT INTO users (username, email, password_hash, role)
        VALUES($1,$2,$3,$4)
        RETURNING *
        `,
        [name,email,hashedPassword,role]
    )

    return result.rows[0];
}

export const getUser = async(email : string ) : Promise<UserModel> =>{
    const result = await pool.query<UserModel>(`
        SELECT * FROM users 
        WHERE email=($1)
        `,
        [email]
    );
    return result.rows[0];
}
// export const getID = async(email : string ) =>{
//     const result = await pool.query<{id:string}>(`
//         SELECT id FROM users 
//         WHERE email=($1)
//         `,
//         [email]
//     );
//     return result.rows[0].id;
// }