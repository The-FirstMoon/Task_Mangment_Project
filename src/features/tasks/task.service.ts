import pool from "../../config/db";
import { editTaskDTO, TaskDTO } from "./task.dto";
import { TaskMODEL } from "./task.types";


export const addTask = async (task : TaskDTO) : Promise<TaskMODEL> =>{
    const {
        title , 
        description, 
        status, 
        priority, 
        assignedUserId, 
        projectId
    } = task
    const result = await pool.query<TaskMODEL>(`
        INSERT INTO tasks (title, description, status, priority, assigned_user_id, project_id)
        VALUES ($1,$2,$3,$4,$5,$6)
        RETURNING *
        `,
        [title, description, status, priority, assignedUserId, projectId]
    )

    return result.rows[0]
}

export const getTasks = async (assignedId: number) : Promise<TaskMODEL[]> =>{
    const result = await pool.query<TaskMODEL>(`
        SELECT * FROM tasks 
        WHERE assigned_user_id = $1
        ORDER BY id
        `,
        [assignedId]
    )

    return result.rows;
}

export const getTask = async (taskId: number) : Promise<TaskMODEL> =>{
    const result = await pool.query<TaskMODEL>(`
        SELECT * FROM tasks 
        WHERE id = $1 
        `,
        [taskId]
    )
    return result.rows[0];
}

export const editTask = async (taskId : number, task: editTaskDTO) : Promise<TaskMODEL>=>{
    const {
        title,
        description,
        assignedUserId,
        priority,
        status,
        projectId
    } = task
    const result = await pool.query<TaskMODEL>(`
        UPDATE tasks
        SET
            title = COALESCE($1, title),
            description = COALESCE($2, description),
            assigned_user_id = COALESCE($3, assigned_user_id),
            priority = COALESCE($4, priority),
            status = COALESCE($5, status),
            project_id = COALESCE($6, project_id)
        WHERE id = $7
        RETURNING *;
        `,
        [title,description, assignedUserId, priority, status, projectId, taskId]
    )
    return result.rows[0]
}

export const deleteTask = async (id: number) : Promise<void> =>{
    await pool.query(`
        DELETE FROM tasks
        WHERE id= $1
        `,
        [id]
    )
}