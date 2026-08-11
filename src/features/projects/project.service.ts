import pool from "../../config/db";
import { editPrjectDTO, prjectDTO } from "./project.dto";
import { ProjectModel } from "./project.type";


export const addProject = async (project: prjectDTO, owner_id: number) : Promise<ProjectModel> =>{
    const {name, description} = project;
    const result = await pool.query<ProjectModel>(`
        INSERT INTO projects (name, description, owner_id)
        VALUES ($1, $2, $3)
        RETURNING *
        `,
        [name, description, owner_id]
    )
    return result.rows[0];
}

export const getProjects = async (owner_id: number) : Promise<ProjectModel[]> =>{
    const result = await pool.query<ProjectModel>(`
        SELECT * FROM projects
        WHERE owner_id = $1
        ORDER BY id
        `,
        [owner_id]
    );
    return result.rows;
}
export const getProject = async (id : number, owner_id : number) : Promise<ProjectModel> => {
    const result = await pool.query <ProjectModel>(`
        SELECT * FROM projects
        WHERE owner_id = $1 AND id = $2
        `,
        [owner_id, id]
    );
    return result.rows[0];
}

export const editProject = async (id: number, project: editPrjectDTO) : Promise<ProjectModel> => {
    const {name, description} = project;
    const result = await pool.query<ProjectModel>(`
        UPDATE projects 
        SET
            name = COALESCE($1, name),
            description = COALESCE($2, description)
        WHERE id = $3
        RETURNING *;
        `,
        [name, description, id]
    )
    return result.rows[0]
}

export const deleteProject = async (id : number) : Promise<void> =>{
    await pool.query(`
        DELETE FROM projects
        WHERE id = $1
        `,
        [id]
    )
}