import pg from "pg";
import dotenv from "dotenv";

dotenv.config(); // Ładowanie zmiennych środowiskowych z .env

const db = new pg.Client({
	user: process.env.DB_USER /* || "postgres" */,
	host: process.env.DB_HOST /* || "localhost" */,
	database: process.env.DB_NAME /* || "booknotes" */,
	password: process.env.DB_PASSWORD /* || "postgres" */,
	port: process.env.DB_PORT /* || 5432 */,
});

export default db;