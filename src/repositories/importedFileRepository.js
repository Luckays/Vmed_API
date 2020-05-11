import { getConnection } from '../service/database';
import _ from 'lodash';
import moment from 'moment';
//old function getFilenameRow - check if is file already in db or not
export async function fetchSingleImportedFile(fullPathname) {
    return new Promise((resolve) => {
        const query = 'SELECT * FROM filename WHERE fname = ?';
        getConnection().query(query, [fullPathname], function (error, results) {
            if (error) throw new Error(error);
            return resolve(results.length === 0 ? undefined : results[0]);
        });
    });
}
//store new file to db or update file size
export async function storeImportedFile(fullPathname, bytes) {
    const file = await fetchSingleImportedFile(fullPathname);

    if (file !== undefined) {
        return new Promise((resolve) => {
            const query = 'UPDATE filename SET filesize = ? WHERE fname = ?';
            getConnection().query(query, [bytes, fullPathname], function (
                error
            ) {
                if (error) throw new Error(error);
                return resolve();
            });
        });
    }

    return new Promise((resolve) => {


        const query = 'INSERT IGNORE INTO filename VALUES (?, ?)';
        getConnection().query(query, [fullPathname, bytes], function (error) {
            if (error) throw new Error(error);
            return resolve();
        });
    });
}
//old saveToDB - save data to db
export async function storeFileData(fullPath, tableName, parsedLines = []) {
    const formattedRows = parsedLines.map((line) => [
        moment(line.date).format('YYYY-MM-DD HH:mm:ss'),
        moment(line.day).format('L'),
        moment(line.date).format('llll'),
        ...line.columns,
    ]);

    return new Promise((resolve) => {
        if (formattedRows.length === 0) {
            return resolve(0)
        }
        
        const query = `INSERT IGNORE INTO ${tableName} VALUES ? `;
        getConnection().query(query, [formattedRows], function (err, result) {
            if (err) throw err;
            console.log('Number of records inserted: ' + result.affectedRows);
            return resolve(result.affectedRows);
        });
    });
}
