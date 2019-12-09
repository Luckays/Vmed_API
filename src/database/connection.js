//connecting to db
import mysql from 'mysql';
export default ()=> {
        const connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'Luckas.11995544',
            database: 'data'
        });

        connection.connect((err) => {
            if (!err) {
               // console.log("Connected");
            } else {
                console.log("Connection Failed");
            }

        });
return connection
}