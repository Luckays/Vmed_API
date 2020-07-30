import fs from 'fs'
import readline from 'readline'
import moment from "moment";
import { storeImportedFile } from '../../repositories/importedFileRepository';
import { getConnection } from '../database';
import { getTableName } from './parser';
import path from 'path';

export async function parseRinexFile(fullPath, bytes,folder) {
    return new Promise(resolve => {
        const extension = path.extname(fullPath).split('.')[1].toLocaleLowerCase();
        const readInterface = readline.createInterface({
            input: fs.createReadStream(fullPath),
            console: false,
        });
        let i =0;
        let numberOfRows = 0;
        let pr= null,td= null,hr= null,zw= null,zd= null,zt= null,wd= null,ws= null,ri= null,hi = null;
        let read_rinex = false;
        const parsedLines = [];
        const tableName = getTableName(folder,extension)
        readInterface.on('line', (line) => {
            i++;
            if (line.includes('TYPES OF OBSERV')){
                let typesOfObserv=  line.split(' ').filter((item) => item !== '')
                let type_i = 0;
                while(typesOfObserv.length>0){
                    const type = typesOfObserv.shift();
                    if (type === '#'){
                        return;
                    }
                    if(type_i ===0){
                        numberOfRows = Number(type)+6;
                    }
                    switch (type) {
                        case 'PR':
                            pr = type_i-1;
                            break;
                        case 'TD':
                            td = type_i-1;
                            break;
                        case 'HR':
                            hr = type_i-1;
                            break;
                        case 'ZW':
                            zw = type_i-1;
                            break;
                        case 'ZD':
                            zd = type_i-1;
                            break;
                        case 'ZT':
                            zt = type_i-1;
                            break;
                        case 'WD':
                            wd = type_i-1;
                            break;
                        case 'WS':
                            ws = type_i-1;
                            break;
                        case 'RI':
                            ri = type_i-1;
                            break;
                        case 'HI':
                            hi = type_i-1;
                            break;
                        default:
                            break;
                    }
                    type_i++;
                }
            }

            if(read_rinex===true){
                if (line.includes('----')) { // check if a line contains the 'user1' keyword
                    read_rinex= false;
                    return;
                }

                parsedLines.push(
                    parse(
                        line.split(' ').filter((item) => item !== ''),
                        numberOfRows
                    )
                );


            }
            if (line.includes('END OF HEADER')) { // check if a line contains the 'user1' keyword
                read_rinex= true;
            }

        });
        readInterface.on('close', async () => {
            await storeFileData(parsedLines,tableName,pr,td,hr,zw,zd,zt,wd,ws,ri,hi);
            await storeImportedFile(fullPath, bytes);
            resolve()
        });
    })
}

function parse(line = [], numberOfRows) {
    const definition = {
        date: new Date(),
        columns: [],
    };

    definition.date.setFullYear(line[0], line[1] - 1, line[2]);
    definition.date.setHours(line[3], line[4], line[5]);
    definition.date.setMilliseconds(0);

    if (numberOfRows <= 6 || numberOfRows > 40) {
        throw Error('Unsupported number of rows ' + numberOfRows);
    }

    for (let i = 6; i < 16; i++) {

        if (line[i] === '?' || line[i]=== undefined || line[i] === null) {
            line[i] = null;
        }
        definition.columns[i - 6] = null;
        definition.columns[i - 6] = line[i];
    }

    return definition;

}


export async function storeFileData (parsedLines,tableName,pr,td,hr,zw,zd,zt,wd,ws,ri,hi) {
    const formattedRows = parsedLines.map((line) => [
        moment(line.date).format('YYYY-MM-DD HH:mm:ss'),
        moment(line.date).format('YYYY-MM-DD'),
        moment(line.date).format('HH:mm:ss'),
        line.columns[pr],
        line.columns[td],
        line.columns[hr],
        line.columns[zw],
        line.columns[zd],
        line.columns[zt],
        line.columns[wd],
        line.columns[ws],
        line.columns[ri],
        line.columns[hi]
    ]);

    console.log(formattedRows)

    return new Promise((resolve) => {
        if (formattedRows.length === 0) {
            return resolve(0)
        }

        const query = `INSERT IGNORE INTO ${tableName} VALUES ? `;
        getConnection().query(query, [formattedRows], function (err, result) {
            if (err) throw err;
            console.log('Number of records inserted: ' + result.affectedRows);
            return resolve(result.affectedRows);
        });
    });
}
