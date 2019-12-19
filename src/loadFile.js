// function of loadFile: separate files dependent on extension, start columns
import readline from "readline";
import path from "path";
import fs from "fs"
import moment from "moment";
//set number of columns
let r_all = 17;
let r_txt = 15;
let r_mol = 15;
let r_bud = 15;
let r_vlh = 15;
import columns from "./columns";
import createConnection from "./database/connection";

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

const saveToDB = async (table, rows) => {
    const formattedRows = rows.map(item => {
        return [ moment(item.date).format('YYYY-MM-DD HH:mm:ss'), ...item.columns ];
    });

    const connection = createConnection();
    const sql = `INSERT IGNORE INTO ${table} VALUES ? `;
    connection.query(sql, [formattedRows], function (err, result) {
        if (err) throw err;
        console.log("Number of records inserted: " + result.affectedRows);
        connection.end();
        return Promise.resolve(result.affectedRows)
    });
};

export default (filename) => {
    return new Promise((resolve, reject) => {
    const readInterface = readline.createInterface({
        input: fs.createReadStream(path.join(__dirname, '../data/', filename)),
        output: process.stdout,
        console: false

    });

    const extension = path.extname(filename).split('.')[1].toLocaleLowerCase();
    let output = [];
    let i = 0;
    let table;

    readInterface.on('line', async line => {
        let split = line.split(' ').filter(item => item !== '');

        switch (extension) {
            case 'all':
                output.push(columns(split, r_all));
                table = 'all_table';
                break;

            case 'txt':
                i++;
                if (i === 1) return;
                output.push(columns(split, r_txt));
                table = 'txt_table';
                break;

            case 'mol':
                output.push(columns(split, r_mol));
                table = 'mol_table';
                break;

            case 'bud':
                output.push(columns(split, r_bud));
                table = 'bud_table';
                break;

            case 'vlh':
                output.push(columns(split, r_vlh));
                table = 'vlh_table';
                break;
        }
    });

    readInterface.on('close', async () => {
        await saveToDB(table, output);
        // await saveToFilenames(table, filesize)
        output = [];
        resolve(true)
    })

        /*
    switch (extension) {
        case 'all':
            readInterface.on('line', (line) => {
                let split = line.split(' ').filter(item => item !== '');
                output.push(columns(split, r_all));

                if (output.length >= 500) {
                    // TODO:

                    output = [];
                }
            });
            break;

        case 'txt':

            readInterface.on('line', (line) => {
                i++;
                if (i === 1) {
                    return;
                }
                let split = line.split(' ').filter(item => item !== '');
                output.push(columns(split, r_txt));
            });
            break;

        case 'mol':

            readInterface.on('line', (line) => {
                let split = line.split(' ').filter(item => item !== '');
                output.push(columns(split, r_mol));
            });
            break;

        case 'bud':
            readInterface.on('line', (line) => {
                let split = line.split(' ').filter(item => item !== '');
                output.push(columns(split, r_bud));
                });
            break;

        case 'vlh':

            readInterface.on('line', (line) => {
                let split = line.split(' ').filter(item => item !== '');
                output.push(columns(split, r_vlh));
            });
            break;
    }

        readInterface.on('close', () => {
            // TODO
            // output

        })*/
    })
}