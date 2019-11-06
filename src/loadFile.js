import readline from "readline";
import path from "path";
import fs from "fs"
let r_all = 25;
let r_txt = 12;
let allLines = [];
let txtLines = [];
import rows from "./rows";

export default (filename) => {
    const readInterface = readline.createInterface({
        input: fs.createReadStream(path.join(__dirname, '../data/', filename)),
        output: process.stdout,
        console: false
    });
console.log(filename);
   const extension = path.extname(filename).split('.')[1].toLocaleLowerCase();

    switch (extension) {
       case 'all':

            readInterface.on('line', (line) => {
                let split = line.split(' ').filter(item => item !== '');
                allLines.push(rows(split, r_all));
            });
            break;

        case 'txt':
            let i = 0;
            readInterface.on('line', (line) => {
                i++;
                if (i===1){
                    return;
                }
                let split = line.split(' ').filter(item => item !== '');
                txtLines.push(rows(split, r_txt));
            });
            break;
    }
    return [allLines,txtLines];
}