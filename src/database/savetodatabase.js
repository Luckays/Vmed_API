//saving to db
import createConnection from "./connection";
import path from "path";
let connection = createConnection();

const getDates = fields =>fields.map(field => field.date)
const getColumns = fields =>fields.map(field => field.columns)
const getAll = fields =>fields.map(field => field)

var toOneArray = function(A) {
    let todb = [];
for(let i = 0;i<A.length;i++){
    let k = ([A[i].date, ...A[i].columns]);
    todb.push(k)

}
    return todb
}

export default (A,filename) => {


    var sqlfilename = "INSERT INTO filename VALUES ('"+filename+"')";
    connection.query(sqlfilename);
    let c = getColumns(A)
    let d = getDates(A)
    let values =  toOneArray(A)
    const extension = path.extname(filename).split('.')[1].toLocaleLowerCase();
    switch(extension) {
        case 'txt':
            var sql = "INSERT INTO txt_table VALUES ?";
                connection.query(sql, [values],function (err, result) {
                    if (err) throw err;
                    console.log("Number of records inserted: " + result.affectedRows);
                });
            break;
        case 'all':
            var sql = "INSERT INTO all_table VALUES ?";
            connection.query(sql, [values],function (err, result) {
                if (err) throw err;
                console.log("Number of records inserted: " + result.affectedRows);
            });
            break;
        case 'mol':
            var sql = "INSERT INTO mol_table VALUES ?";
            connection.query(sql, [values],function (err, result) {
                if (err) throw err;
                console.log("Number of records inserted: " + result.affectedRows);
            });
            break;
        case 'bud':
            var sql = "INSERT INTO bud_table VALUES ?";
            connection.query(sql, [values],function (err, result) {
                if (err) throw err;
                console.log("Number of records inserted: " + result.affectedRows);
            });
            break;


        case 'vlh':
            var sql = "INSERT INTO vlh_table VALUES ?";
            connection.query(sql, [values],function (err, result) {
                if (err) throw err;
                console.log("Number of records inserted: " + result.affectedRows);
            });
            break;

    }






}
