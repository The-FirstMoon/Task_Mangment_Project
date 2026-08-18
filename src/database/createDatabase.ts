import { Client } from "pg";
import dotenv from "dotenv";

dotenv.config();

export const createDatabase= async () => {
  const databaseName = process.env.DB_NAME;

  if (!databaseName) {
    throw new Error("DB_NAME is not defined in .env");
  }

  const client = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    database: "postgres",
    port: Number(process.env.DB_PORT),
  });

  try {
    await client.connect();

    const result = await client.query(
      "SELECT 1 FROM pg_database WHERE datname = $1",
      [databaseName]
    );

    if (result.rowCount === 0) {
      await client.query(`CREATE DATABASE "${databaseName}"`);
      console.log(`Database "${databaseName}" created.`);
    } else {
      console.log(`Database "${databaseName}" already exists.`);
    }
  } finally {
    await client.end();
  }
}