// function of openFolder: read filename from folder, save filename, start loadFile
// function getFilenameRow looking in database if filename is already in db or not
// function saveToFilename, saving filename if not exist
// function updatefilesize, updating size to existing filename

import fs from 'fs';
import loadFile from './loadFile';
import createConnection from './database/connection';
import updatefilesize from './database/updatefilesize';

const getFilenameRow = (file_name,folder_name) => {
    var name = [folder_name,file_name].join('/');
    let connection = createConnection();
    return new Promise(resolve => {
        var sql = "SELECT * FROM filename WHERE fname = ?";
        connection.query(sql, [name], function(error, results) {
            if (results === undefined) results = 0
            results.length === 0
                ? resolve(null)
                : resolve(results[0]);//p5idat error
            connection.end();
        });

    });

};

const saveToFilename = async (filename , fileSizeInBytes,foldername) => {
    let connection = createConnection();
    var sqlfilename = "INSERT IGNORE INTO filename VALUES ('"+foldername+"' '/' '"+ filename + "','" + fileSizeInBytes + "')";
     connection.query(sqlfilename);
    connection.end();

}

export default foldername => {
    return new Promise(async (resolve, reject) => {
        const filenames = fs.readdirSync(foldername);
        while (filenames.length > 0) {
            const filename = filenames.shift();
            const row = await getFilenameRow(filename,foldername);
            const fileSizeInBytes = fs.statSync([foldername, filename].join('/')).size;
            resolve(true)


            if (row ===  null || row.filesize < fileSizeInBytes) {
                await loadFile(filename,foldername);
                if(row === null) {
    saveToFilename(filename, fileSizeInBytes,foldername)
}
               if (row != null && row.filesize < fileSizeInBytes) {
                   await updatefilesize(filename,fileSizeInBytes,foldername)
                }
            }


        }
    })

}

