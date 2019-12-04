//saving to db
import createConnection from "./connection";
import path from "path";
let connection = createConnection();

const getDates = fields =>fields.map(field => field.date)
const getColumns = fields =>fields.map(field => field.columns)
const getAll = fields =>fields.map(field => field)

var toOneArray = function(data,columns) {
    return data.map(function(date, i) {
            return [date,columns[i]]

        });
}


export default (A,filename) => {


    var sqlfilename = "INSERT INTO filename VALUES ('"+filename+"')";
    connection.query(sqlfilename)
    let c = getColumns(A)
    let d = getDates(A)
    let values =c
    const extension = path.extname(filename).split('.')[1].toLocaleLowerCase();
    switch(extension) {
        case 'txt':
            var sql = "INSERT INTO txt_table (s1, s2, s3, s4, s5, s6, s7, s8, s9) VALUES ?";




            connection.query(sql, [values],function (err, result) {
                if (err) throw err;
                console.log("Number of records inserted: " + result.affectedRows);
            });
    break;

        case 'all':
            var sql = "INSERT INTO all_table (s1, s2, s3, s4, s5, s6, s7, s8, s9) VALUES ?";

            console.log(toOneArray(d,c))


            connection.query(sql, [values],function (err, result) {
                if (err) throw err;
                console.log("Number of records inserted: " + result.affectedRows);
            });
            break;

        case 'mol':
            var sql = "INSERT INTO mol_table (s1, s2, s3, s4, s5, s6, s7, s8, s9) VALUES ?";

            console.log(toOneArray(d,c))


            connection.query(sql, [values],function (err, result) {
                if (err) throw err;
                console.log("Number of records inserted: " + result.affectedRows);
            });
            break;

        case 'bud':
            var sql = "INSERT INTO bud_table (s1, s2, s3, s4, s5, s6, s7, s8, s9) VALUES ?";

            console.log(toOneArray(d,c))


            connection.query(sql, [values],function (err, result) {
                if (err) throw err;
                console.log("Number of records inserted: " + result.affectedRows);
            });
            break;

        case 'vlh':
            var sql = "INSERT INTO vlh_table(s1, s2, s3, s4, s5, s6, s7, s8, s9) VALUES ?";

            console.log(toOneArray(d,c))


            connection.query(sql, [values],function (err, result) {
                if (err) throw err;
                console.log("Number of records inserted: " + result.affectedRows);
            });
            break;

    }


}