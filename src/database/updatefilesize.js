import createConnection from './connection';

let connection = createConnection();
export default (size, id) => {
    var sql =
        "UPDATE filename SET filesize = '" + size + "' WHERE id = '" + id + "'";
    connection.query(sql, function(err, result) {
        if (err) throw err;
        console.log(result.affectedRows + ' record(s) updated');
    });
};
