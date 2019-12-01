// function of loadFile: separate files dependent on extension, start columns
import readline from "readline";
import path from "path";
import fs from "fs"
let A = [];
//set number of columns
let r_all = 25;
let r_txt = 15;
import columns from "./columns";
import createConnection from "./database/connection";
const connection = createConnection()


export default (filename) => {
    return new Promise((resolve, reject) => {
    const readInterface = readline.createInterface({
        input: fs.createReadStream(path.join(__dirname, '../data/', filename)),
        output: process.stdout,
        console: false

    });
    readInterface.clear;

    console.log(filename);
    const extension = path.extname(filename).split('.')[1].toLocaleLowerCase();

    switch (extension) {
        case 'all':

            readInterface.on('line', (line) => {
                let split = line.split(' ').filter(item => item !== '');
                //allLines.push(columns(split, r_all));
            });
            break;

        case 'txt':
            let i = 0;
            readInterface.on('line', (line) => {
                i++;
                if (i === 1) { /// if split[0]==='-1'
                    return;
                }
                let split = line.split(' ').filter(item => item !== '');
                A.push(columns(split, r_txt));
            });
            break;
    }


        readInterface.on('close', () => {resolve(A)})
})
}