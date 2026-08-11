import pool from "../../config/db";
import { UserModel } from "./user.type";

export const findById = async (id: number) : Promise<UserModel> =>{
    const result = await pool.query<UserModel>(`
            SELECT * FROM users
            WHERE id = ($1)
        `,
        [id]
    )
    return result.rows[0]
}

export const deleteUser =  async (id: number) : Promise<void> =>{
    await pool.query(`
        DELETE FROM users
        WHERE id = ($1)
        `,
        [id]
    );
}