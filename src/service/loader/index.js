import fs from 'fs';
import { fetchSingleImportedFile } from '../../repositories/importedFileRepository';
import { parseFile } from './parser';
//old function like openFolder - first upload all files, then set refresh interval
export function watchFolders(folders = [], interval) {
    folders.forEach(checkFolder);
    setInterval(() => folders.forEach(checkFolder), interval);
}
//old function foldername - get filenames from folder
async function checkFolder(folder) {
    console.log(`📸 I am checking folder ${folder}`);
    const filenames = fs.readdirSync(folder);
    while (filenames.length > 0) {
        const filename = filenames.shift();
        await checkFile(folder, filename);
    }
}
//- check if is in folder new file or some file change size
async function checkFile(folder, filename) {
    const fullPathname = `${folder}/${filename}`;
    const bytes = fs.statSync(fullPathname).size;
    const row = await fetchSingleImportedFile(fullPathname);
    console.log(fullPathname)
    if (row === undefined || row.filesize < bytes) {
        parseFile(fullPathname, bytes);
    }
}
