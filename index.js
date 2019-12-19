//function of index set name of folder, excerpt data, start openFolder
import express from 'express'
import openFolder from "./src/openFolder";
const app = express();
app.listen(50000);

const loadFoldersData = async () => {
    while (true) {
        await openFolder('data')
    }
};

loadFoldersData();
