import path from 'path';
import readline from 'readline';
import fs from 'fs';
import {
    storeFileData,
    storeImportedFile,
} from '../../repositories/importedFileRepository';

export function parseFile(fullPath, bytes) {
    const extension = path.extname(fullPath).split('.')[1].toLocaleLowerCase();

    const readInterface = readline.createInterface({
        input: fs.createReadStream(path.join(__dirname, '../../../', fullPath)),
        console: false,
    });

    const tableName = getTableName(extension);
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

function getTableName(extension) {
    switch (extension) {
        case 'all':
            return 'all_table';

        case 'txt':
            return 'txt_table';

        case 'mol':
            return 'mol_table';

        case 'bud':
            return 'bud_table';

        case 'vlh':
            return 'vlh_table';
    }
}

function getNumberOfColumns(extension) {
    switch (extension) {
        case 'all':
            return 27;

        case 'txt':
            return 12;

        case 'mol':
            return 11;

        case 'bud':
            return 23;

        case 'vlh':
            return 24;
    }
}

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
