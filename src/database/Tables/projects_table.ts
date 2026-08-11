import pool from "../../config/db";

export async function createProjectsTable(){
    await pool.query(`
        CREATE TABLE IF NOT EXISTS projects(
            id SERIAL PRIMARY KEY,
            name   VARCHAR(35) NOT NULL,
            description  VARCHAR(67) NULL,
            owner_id INTEGER NOT NULL,
            
            create_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

            FOREIGN KEY (owner_id)
                REFERENCES users(id)
                ON DELETE CASCADE
        )
    `);
    console.log("Project table is ready")
}