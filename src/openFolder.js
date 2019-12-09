// function of openFolder: read filename from folder, save filename, start loadFile
import fs from 'fs'
import loadFile from "./loadFile";
import createConnection from "./database/connection";
import savetodatabase from "./database/savetodatabase";
import updatefilesize from "./database/updatefilesize";


let rowexists = (mystring) => {

    let connection = createConnection();
    return new Promise(resolve => {
        let sql = "SELECT * FROM ?? WHERE ?? = ?";
        connection.query(sql, ['filename', 'name', mystring], function(error, result){
            if(result[0] === undefined){

                result = false;
            }
            resolve(result)
connection.end()
        });

    });
};


const getSize = fields =>fields.map(field => field.size)
export default (foldername)=> {
    return new Promise((resolve, reject) => {


        var filename = fs.readdirSync(foldername);
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
        }
    })
}

