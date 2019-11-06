// function of openFolder
import fs from 'fs'
import loadFile from "./loadFile";
export default (foldername)=>  {
    var filename = fs.readdirSync(foldername);
    let a;
    for (let i = 0; i < filename.length; i++) {
        a = loadFile(filename[i]);
    }
return a;
    }

