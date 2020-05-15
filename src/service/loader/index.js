import fs from 'fs';
import readline from 'readline';
import { fetchSingleImportedFile } from '../../repositories/importedFileRepository';
import { parseFile } from './parser';

//old function like openFolder - first upload all files, then set refresh interval
export async function watchFolders(folders = [], excluded = [], interval) {
    do {
        await Promise.all(folders.map(folder => checkFolder(folder, excluded)));
        await wait(interval)
    } while (true);
}


async function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

//old function foldername - get filenames from folder
async function checkFolder(folder, excluded = []) {
    const filenames = fs.readdirSync(folder);
    const count = filenames.length;
    console.log(`📸 I am checking folder ${folder}, ${count} files`);
    
    while (filenames.length > 0) {
        const filename = filenames.shift(); 
        if (excluded.indexOf(filename) !== -1) continue;
        
        await checkFile(folder, filename); 
        readline.clearLine(process.stdout, 0);
        readline.cursorTo(process.stdout, 0);
        process.stdout.write(`📸📸 Checked ${count - filenames.length}/${count} files from ${folder}`);
    }
        
    process.stdout.write('\n');
}

//- check if is in folder new file or some file change size
async function checkFile(folder, filename) {
    const fullPathname = `${folder}/${filename}`;
    const bytes = fs.statSync(fullPathname).size;
    const row = await fetchSingleImportedFile(fullPathname);
    
    if (row === undefined || row.filesize < bytes) {
        await parseFile(fullPathname, bytes);
    }
}
