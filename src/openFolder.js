// function of openFolder: read filename from folder, save filename, start loadFile
import fs from 'fs'
import loadFile from "./loadFile";
import createConnection from "./database/connection";


export default (foldername)=> {
    return new Promise(resolve => {
        var filename = fs.readdirSync(foldername);
        let A;
        for (let i = 0; i < filename.length; i++) {
            A = loadFile(filename[i]).then((A) => {
            //treba tady bych umistil novou fci savetodatabase, enbo bych to tady chtel zobrazit

            }).catch((error) => {
                console.log("error")

            })
        }
        return A
        console.log(filename)
    })


    }
