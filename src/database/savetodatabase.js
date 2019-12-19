//saving to db
import createConnection from './connection';
import path from 'path';

const getDates = fields => fields.map(field => field.date);
const getColumns = fields => fields.map(field => field.columns);
const getAll = fields => fields.map(field => field);

var toOneArray = function(A) {
    let todb = [];
    for (let i = 0; i < A.length; i++) {
        let k = [A[i].date, ...A[i].columns];
        todb.push(k);
    }
    return todb;
};

export default (A, index, filename, oriniginalfileresult, fileSizeInBytes) => {
    if (oriniginalfileresult === false) {
        let connection = createConnection();
        var sqlfilename =
            "INSERT INTO filename VALUES ('" +
            index +
            "','" +
            filename +
            "','" +
            fileSizeInBytes +
            "')";
        connection.query(sqlfilename);
        connection.end();
    }
    let c = getColumns(A);
    let d = getDates(A);
    let values = toOneArray(A);

    {
        var path = [foldername, filename[i]];
        var pathtosize = path.join('/');
        const stats = fs.statSync(pathtosize);
        const fileSizeInBytes = stats.size;

        if (!!result === false || result[0].filesize < fileSizeInBytes) {
            loadFile(filename[i])
                .then(A => {
                    savetodatabase(
                        A,
                        i,
                        filename[i],
                        !!result,
                        fileSizeInBytes
                    );
                    if (result[0].filesize < fileSizeInBytes) {
                        updatefilesize(fileSizeInBytes, i);
                    }
                })
                .catch(error => {
                    console.log('error openFolder');
                });
        }
    }

    const extension = path
        .extname(filename)
        .split('.')[1]
        .toLocaleLowerCase();
    switch (extension) {
        case 'txt':
            var sql = 'INSERT IGNORE INTO txt_table VALUES ?';
            let connection1 = createConnection();

            connection1.query(sql, [values], function(err, result) {
                if (err) throw err;
                console.log(
                    'Number of records inserted: ' + result.affectedRows
                );
                connection1.end();
            });
            break;
        case 'all':
            let connection2 = createConnection();
            var sql = 'INSERT IGNORE INTO all_table VALUES ?';
            connection2.query(sql, [values], function(err, result) {
                if (err) throw err;
                console.log(
                    'Number of records inserted: ' + result.affectedRows
                );
                connection2.end();
            });
            break;
        case 'mol':
            let connection3 = createConnection();
            var sql = 'INSERT IGNORE INTO mol_table VALUES ?';
            connection3.query(sql, [values], function(err, result) {
                if (err) throw err;
                console.log(
                    'Number of records inserted: ' + result.affectedRows
                );
                connection3.end();
            });
            break;
        case 'bud':
            let connection4 = createConnection();
            var sql = 'INSERT IGNORE INTO bud_table VALUES ? ';
            connection4.query(sql, [values], function(err, result) {
                if (err) throw err;
                console.log(
                    'Number of records inserted: ' + result.affectedRows
                );
                connection4.end();
            });
            break;

        case 'vlh':
            let connection5 = createConnection();
            var sql = 'INSERT IGNORE INTO vlh_table VALUES ?';
            connection5.query(sql, [values], function(err, result) {
                if (err) throw err;
                console.log(
                    'Number of records inserted: ' + result.affectedRows
                );
                connection5.end();
            });
            break;
    }
};
