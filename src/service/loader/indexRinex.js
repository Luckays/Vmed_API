import fs from 'fs'
import readline from 'readline'
import moment from "moment";
import { fetchSingleImportedFile, storeImportedFile } from '../../repositories/importedFileRepository';
import {parseRinexFile} from './parserRinex';

export async function checkRinex(folder) {
    const filenames = fs.readdirSync(folder);
    console.log(filenames)
    const count = filenames.length;
    while (filenames.length > 0) {
        const filename = filenames.shift();
       await checkFileRinex(folder, filename)
        readline.clearLine(process.stdout, 0);
        readline.cursorTo(process.stdout, 0);

        process.stdout.write(`📸📸 Checked RInex ${count - filenames.length}/${count} files from ${folder} Checking ${filename}  `);
    }

    process.stdout.write('\n');



}
    async function wait(ms) {
        return new Promise(resolve => setTimeout(resolve, ms))
    }

    async function checkFileRinex(folder, filename) {

        const fullPath = `${folder}/${filename}`;
        const bytes = fs.statSync(fullPath).size;
        const row = await fetchSingleImportedFile(fullPath);
        if (row === undefined || row.filesize < bytes) {
            await parseRinexFile(fullPath, bytes,folder);
        }

    }



