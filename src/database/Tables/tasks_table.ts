import pool from "../../config/db";

export async function createTasksTable(){
    await pool.query(`
        CREATE TABLE IF NOT EXISTS tasks(
            id SERIAL PRIMARY KEY,
            title   VARCHAR(35) NOT NULL,
            description  VARCHAR(67) NULL,
            status VARCHAR(10) NOT NULL CHECK (status IN ('TODO', 'INPROGRESS', 'DONE')) NOT NULL,
            priority VARCHAR(10) CHECK(priority IN('LOW', 'MEDIUM', 'HIGH')),

            assigned_user_id INTEGER NOT NULL,
            project_id INTEGER NOT NULL,

            FOREIGN KEY (assigned_user_id)
                REFERENCES users(id)
                ON DELETE CASCADE,
            FOREIGN KEY (project_id)
                REFERENCES projects(id)
                ON DELETE CASCADE
        )
    `);
    console.log("Tasks table is ready")
}