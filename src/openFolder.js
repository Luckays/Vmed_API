import fs from 'fs'
import {parseFile} from "./parseFile";
import loadFile from "./loadFile";
export default (foldername)=>  {
    var filename = fs.readdirSync(foldername);

    for (let i = 0; i < filename.length; i++) {
        let a = loadFile(filename[i]);

    }

}