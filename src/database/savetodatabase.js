import createConnection from "./connection";
let connection = createConnection();

const getDates = fields =>fields.map(field => field.date)
const getColumns = fields =>fields.map(field => field.columns)
const getAll = fields =>fields.map(field => field)

var toOneArray = function(data,columns) {
    return data.map(function(date, i) {
            return [date,columns[i]]

        });
}


export default (A) => {
    console.log([A.date, ...A.columns]);
    
    let c = getColumns(A)
    c.pop();
    let d = getDates(A)
console.log(toOneArray(d,c))
    //var sql = "INSERT INTO txt_table VALUES ('"+A.date+"','"+A.columns[0]+"','"+A.columns[1]+"','"+A.columns[2]+"','"+A.columns[3]+"','"+A.columns[4]+"','"+A.columns[5]+"','"+A.columns[6]+"','"+A.columns[7]+"','"+A.columns[8]+"')";
    var sql = "INSERT INTO txt_table (datum,s1, s2, s3, s4, s5, s6, s7, s8, s9) VALUES ?";

/*let values =k
    //connection.query(sql)
    connection.query(sql, [values],function (err, result) {
        if (err) throw err;
        console.log("Number of records inserted: " + result.affectedRows);
    });
*/
}
