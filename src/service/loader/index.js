import fs from 'fs';
import { fetchSingleImportedFile } from '../../repositories/importedFileRepository';
import { parseFile } from './parser';

export function watchFolders(folders = [], interval) {
    folders.forEach(checkFolder);
    setInterval(() => folders.forEach(checkFolder), interval);
}

async function checkFolder(folder) {
    console.log(`📸 I am checking folder ${folder}`);
    const filenames = fs.readdirSync(folder);
    while (filenames.length > 0) {
        const filename = filenames.shift();
        await checkFile(folder, filename);
    }
}

async function checkFile(folder, filename) {
    const fullPathname = `${folder}/${filename}`;
    const bytes = fs.statSync(fullPathname).size;
    const row = await fetchSingleImportedFile(fullPathname);

    if (row === undefined || row.filesize < bytes) {
        parseFile(fullPathname, bytes);
    }
}
