import pool from "../../config/db";

export async function createUsersTable(){
    await pool.query(`
        CREATE TABLE IF NOT EXISTS users(
            id SERIAL PRIMARY KEY,
            username VARCHAR(35) NOT NULL,
            email  VARCHAR(67) UNIQUE NOT NULL,
            password_hash VARCHAR(100) NOT NULL,
            role VARCHAR(10) NOT NULL CHECK (role IN ('USER', 'ADMIN')),
            create_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            update_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `);
    console.log("Users table is ready")
}