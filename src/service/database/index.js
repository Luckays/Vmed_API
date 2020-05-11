import mysql from 'mysql';
import { runMigrations } from './migration';

let pool;
//old connection - get connection to db
export async function invokeConnection() {
    return new Promise((resolve) => {
        pool = mysql.createPool({
            host: 'localhost',
            user: 'root',
            password: 'Luckas.11995544',
            database: 'data',
            port: process.env.DB_PORT,
        });

        runMigrations();
        resolve();
    });
}

export function getConnection() {
    return pool;
}
