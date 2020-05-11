import mysql from 'mysql';
import { runMigrations } from './migration';

let pool;
//old connection - get connection to db
export async function invokeConnection() {
    return new Promise((resolve) => {
        pool = mysql.createPool({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
            port: process.env.DB_PORT,
        });

        runMigrations();
        resolve();
    });
}

export function getConnection() {
    return pool;
}