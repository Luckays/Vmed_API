// function of openFolder: read filename from folder, save filename, start loadFile
import fs from 'fs'
import loadFile from "./loadFile";
import createConnection from "./database/connection";
import savetodatabase from "./database/savetodatabase";
import updatefilesize from "./database/updatefilesize";


const getFilenameRow = (mystring) => {
    let connection = createConnection();
    return new Promise(resolve => {
        let sql = "SELECT * FROM filename WHERE name = ?";
        connection.query(sql, [mystring], function(error, results){
            results.length === 0
                ? resolve(null)
                : resolve(results[0]);

            connection.end()
        });

    });
};

const getSize = fields =>fields.map(field => field.size)
export default (foldername)=> {
    return new Promise(async (resolve, reject) => {
        const filenames = fs.readdirSync(foldername);
        while (filenames.length > 0) {
            const filename = filenames.shift();
            const row = await getFilenameRow(filename);
            const fileSizeInBytes = fs.statSync([foldername, filename].join('/')).size;
            if (row === null || row.filesize < fileSizeInBytes) {
                await loadFile(filename)
            }
        }

        /*
        for (let i = 0; i < filename.length; i++) {
            rowexists(filename[i]).then((result) => {

                var path = [foldername, filename[i]];
                var pathtosize = path.join('/');
                const stats = fs.statSync(pathtosize);
                const fileSizeInBytes = stats.size;


                if(!!result === false||result[0].filesize<fileSizeInBytes) {


                loadFile(filename[i]).then((A) => {


                    savetodatabase(A, i, filename[i], !!result,fileSizeInBytes)
                    if (result[0].filesize<fileSizeInBytes) {
                        updatefilesize(fileSizeInBytes, i)
                    }
                }).catch((error) => {
                    console.log("error openFolder")

                })

            }
            })
        }*/
    })
}

