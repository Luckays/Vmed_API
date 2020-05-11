import path from 'path';
import readline from 'readline';
import fs from 'fs';
import {
    storeFileData,
    storeImportedFile,
} from '../../repositories/importedFileRepository';
//old loadFile - separate files dependent on extension
export function parseFile(fullPath, bytes) {
    const extension = path.extname(fullPath).split('.')[1].toLocaleLowerCase();
    if (fullPath === '/nasdat/01/DATA/METEOgopeARCHIV/aktual.txt') return;
    if (extension ==='met' || extension === 'tst' ||extension==='puv'||extension==='res') return;
  //  if (extension=== 'err' ||extension === 'exe') return;

    const readInterface = readline.createInterface({
        input: fs.createReadStream(fullPath),
        console: false,
    });

    const tableName = getTableName(extension);
    //console.log(tableName)

    const numberOfRows = getNumberOfColumns(extension);
    const parsedLines = [];
    let i = 0;

    readInterface.on('line', (line) => {
        i++;
        if (extension === 'txt' && i === 1) return;

        parsedLines.push(
            parse(
                line.split(' ').filter((item) => item !== ''),
                numberOfRows
            )
        );
    });

    readInterface.on('close', async () => {
        await storeFileData(fullPath, tableName, parsedLines);
        await storeImportedFile(fullPath, bytes);
    });
}
//get table name
function getTableName(extension) {
    switch (extension) {
        case 'all':
            return 'all_table';
        break;
        case 'txt':
            return 'txt_table';
 break;
        case 'mol':
            return 'mol_table';
 break;
        case 'bud':
            return 'bud_table';
 break;
        case 'vlh':
            return 'vlh_table';
            break;
        case 'vgl':
            return 'vgl_table';
            break;
        case 'bgl':
            return 'bgl_table';
            break;
    }
}
// get number of columns
function getNumberOfColumns(extension) {
    switch (extension) {
        case 'all':
            return 27;
 break;
        case 'txt':
            return 12;
 break;
        case 'mol':
            return 11;
 break;
        case 'bud':
            return 23;
 break;
        case 'vlh':
            return 24;
             break;
        case 'vgl':
            return 31;
            break;
        case 'bgl':
            return 25;
            break;
    }
}
//old columns - split data assign
function parse(line = [], numberOfRows) {
    const definition = {
        date: new Date(),
        day: new Date(),
        columns: [],
    };

    definition.date.setFullYear(line[0], line[1] - 1, line[2]);
    definition.day.setFullYear(line[0], line[1] - 1, line[2]);
    definition.date.setHours(line[3], line[4], line[5]);
    definition.date.setMilliseconds(0);

    if (numberOfRows <= 6 || numberOfRows > 40) {
        throw Error('Unsupported number of rows ' + numberOfRows);
    }

    for (let i = 6; i < numberOfRows; i++) {
        if (line[i] === undefined) {
            line[i] = null;
        }
        if (line[i] === '?') {
            line[i] = null;
        }
        definition.columns[i - 6] = line[i];
    }

    return definition;
}
