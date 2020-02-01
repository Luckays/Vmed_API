// function updatefilesize, updating size to existing filename
import createConnection from './connection';

let connection = createConnection();
export default (filename,size,foldername) => {
    return new Promise((resolve, reject) => {

    var sql = "UPDATE filename SET filesize = '" + size + "' WHERE fname = '"+foldername+"' '/' '"+ filename + "' ";



        connection.query(sql, function (err, result) {
            if (err) throw err;
            console.log(result.affectedRows + ' record(s) updated');
            resolve(true);
        });
    })

};
