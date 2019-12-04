// function of openFolder: read filename from folder, save filename, start loadFile
import fs from 'fs'
import loadFile from "./loadFile";
import createConnection from "./database/connection";
import savetodatabase from "./database/savetodatabase";

export default (foldername)=> {
    return new Promise(resolve => {
        var filename = fs.readdirSync(foldername);
        let A;
        for (let i = 0; i < filename.length; i++) {
            loadFile(filename[i]).then((A) => {

            savetodatabase(A,filename[i])

            })/*.catch((error) => {
                console.log("error")

           })*/
        }
        return A
        console.log(filename)
    })


    }
