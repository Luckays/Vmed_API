//connecting to db
import mysql from 'mysql';
require('dotenv').config();

export default () => {
    const connection = mysql.createConnection({
        host: process.env.HOST,
        user: process.env.PUPIL,
        password: process.env.PASSWORD,
        database: process.env.DATABASE,
    });

    connection.connect(err => {
        if (!err) {
            // console.log("Connected");
        } else {
            console.log('Connection Failed');
        }
    });
    return connection;
};
