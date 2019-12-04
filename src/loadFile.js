// function of loadFile: separate files dependent on extension, start columns
import readline from "readline";
import path from "path";
import fs from "fs"

//set number of columns
let r_all = 15;
let r_txt = 15;
let r_mol = 15;
let r_bud = 15;
let r_vlh = 15;
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
        let A = [];
        let i = 0;
    switch (extension) {

        case 'all':

            readInterface.on('line', (line) => {
                let split = line.split(' ').filter(item => item !== '');
                A.push(columns(split, r_all));
            });
            break;

        case 'txt':

            readInterface.on('line', (line) => {
                i++;
                if (i === 1) {
                    return;
                }
                let split = line.split(' ').filter(item => item !== '');
                A.push(columns(split, r_txt));
            });
            break;

        case 'mol':

            readInterface.on('line', (line) => {
                let split = line.split(' ').filter(item => item !== '');
                A.push(columns(split, r_mol));
            });
            break;

        case 'bud':

            readInterface.on('line', (line) => {
                let split = line.split(' ').filter(item => item !== '');
                A.push(columns(split, r_bud));
            });
            break;

        case 'vlh':

            readInterface.on('line', (line) => {
                let split = line.split(' ').filter(item => item !== '');
                A.push(columns(split, r_vlh));
            });
            break;
    }


        readInterface.on('close', () => {resolve(A)})
})
}