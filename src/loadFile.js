// function of loadFile: separate files dependent on extension, start columns
//function saveToDB saving data to db
import readline from 'readline';
import path from 'path';
import fs from 'fs';
import moment from 'moment';
//set number of columns
let r_all = 27;
let r_txt = 12;
let r_mol = 11;
let r_bud = 23;
let r_vlh = 24;
let r2_all = 7;
import columns from './columns';
import createConnection from './database/connection';



const saveToDB = async (table, rows) => {




    const formattedRows = rows.map(item => {
        return [
            moment(item.date).format('YYYY-MM-DD HH:mm:ss'),
            moment(item.day).format('L'),
            moment(item.date).format('llll'),
            ...item.columns
        ];
    });

    const connection = createConnection();
    const sql = `INSERT IGNORE INTO ${table} VALUES ? `;
    connection.query(sql, [formattedRows], function(err, result) {
        if (err) throw err;
        console.log('Number of records inserted: ' + result.affectedRows);
        connection.end();
        return Promise.resolve(result.affectedRows);
    });
};

export default (filename,foldername) => {
    return new Promise((resolve, reject) => {
        const readInterface = readline.createInterface({
            input: fs.createReadStream(
                path.join(__dirname, '../',foldername,'/', filename)
            ),
            output: process.stdout,
            console: false
        });

        const extension = path
            .extname(filename)
            .split('.')[1]
            .toLocaleLowerCase();
        let output = [];
        let i = 0;
        let table;



        readInterface.on('line', async line => {
            let split = line.split(' ').filter(item => item !== '');
            switch (foldername) {
                case 'slozka1':

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
                    break;

                case 'slozka2':
                    switch (extension) {
                        case 'all':
                            output.push(columns(split, r2_all));
                            table = 'all_table2';
                            break;


                    }
                    break;
            }
        });

        readInterface.on('close', async () => {

            await saveToDB(table, output);
            output = [];
            resolve(true);
        });


    });
};
