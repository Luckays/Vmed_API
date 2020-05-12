import fs from 'fs';
import { fetchSingleImportedFile } from '../../repositories/importedFileRepository';
import { parseFile } from './parser';

//old function like openFolder - first upload all files, then set refresh interval
export async function watchFolders(folders = [], interval) {
    do {
        await folders.forEach(checkFolder);
        await wait(interval);
    } while (true);
}

async function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

//old function foldername - get filenames from folder
async function checkFolder(folder) {
    const filenames = fs.readdirSync(folder);
    const count = filenames.length;
    console.log(`📸 I am checking folder ${folder}, ${count} files`);
    
    while (filenames.length > 0) {
        const filename = filenames.shift();
        await checkFile(folder, filename);
        
        process.stdout.clearLine(0);
        process.stdout.cursorTo(0);
        process.stdout.write(`📸📸 Checked ${count - filenames.length}/${count} files from ${folder}`);
    }
        
    process.stdout.write('\n');
}

//- check if is in folder new file or some file change size
async function checkFile(folder, filename) {
    const fullPathname = `${folder}/${filename}`;
    const bytes = fs.statSync(fullPathname).size;
    const row = await fetchSingleImportedFile(fullPathname);
    console.log(fullPathname);
    if (row === undefined || row.filesize < bytes) {
        await parseFile(fullPathname, bytes);
    }
}
