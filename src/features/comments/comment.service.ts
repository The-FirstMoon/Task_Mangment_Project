import pool from "../../config/db";
import { addCommentDTO, editCommentDTO } from "./comment.dto";
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

export const getComments = async(taskId: number) : Promise<CommentModel[]> => {
    const result = await pool.query<CommentModel>(`
        SELECT * FROM comments
        WHERE task_id = $1
        `,
        [taskId]
    )
    return result.rows
}

export const getComment = async(CommentId: number) : Promise<CommentModel> => {

    const result = await pool.query<CommentModel>(`
        SELECT * FROM comments
        WHERE id = $1
        `,
        [CommentId]
    )
    return result.rows[0]    
}

export const editComment = async(commentId : number, comment : editCommentDTO) : Promise<CommentModel> =>{
    const {
        text
    } = comment
    const result =  await pool.query<CommentModel>(`
        UPDATE comments
        SET
            text= COALESCE($1, text)
        WHERE id = $2
        RETURnING *
        `,
        [text, commentId]
    )

    return result.rows[0];
}

export const deleteComment = async(commentId : number) : Promise<void> =>{
    await pool.query(`
        DELETE FROM comments
        WHERE id = $1
        `,
        [commentId]
    )
}