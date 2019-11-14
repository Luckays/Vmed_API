import mysql from 'mysql';
import  express from 'express';
var app = express();
export default ()=> {
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'Luckas.11995544',
        database: 'data'
    });


    connection.connect((ferr)=>{
        if (!err)
        {
            console.log("Connected");
        }
        else
        {
            console.log("Connection Failed");
        }

    });
   /* app.get('/',function (req,resp) {
       connection.query("SELECT * FROM Data",function(error,rows.field});
       ))
        
    });*/
 app.listen(1337);
}