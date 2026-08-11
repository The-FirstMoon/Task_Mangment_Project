import pool from "../../config/db";

export async function createCommentsTable(){
    await pool.query(`
        CREATE TABLE IF NOT EXISTS comments(
            id SERIAL PRIMARY KEY,
            text  VARCHAR(250) NOT NULL,
            user_id INTEGER NOT NULL,
            text_id INTEGER NOT NULL,

            create_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

            FOREIGN KEY (user_id)
                REFERENCES users(id)
                ON DELETE CASCADE,
            FOREIGN KEY (text_id)
                REFERENCES users(id)
                ON DELETE CASCADE
        )
    `);
    console.log("Comments table is ready")
}