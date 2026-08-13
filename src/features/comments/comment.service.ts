import pool from "../../config/db";
import { addCommentDTO } from "./comment.dto";
import { CommentModel } from "./comment.types";




export const addComment = async(comment : addCommentDTO) : Promise<CommentModel> =>{
    const{
        text,
        task_id,
        user_id
    } = comment;
    const result =  await pool.query<CommentModel>(`
        INSERT INTO comments (text, task_id, user_id)
        VALUES ($1, $2, $3)
        RETURNING *
        `,
        [text, task_id, user_id]
    )
    return result.rows[0]
}