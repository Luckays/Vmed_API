//function of index set name of folder, excerpt data, start openFolder
//function loadFolderData first load all data from folders you define
//function getFromDB get data from database to application
import openFolder from "./src/openFolder";
import getFromDB from "./src/api/getFromDB";
require('dotenv').config();

const loadFoldersData = async () => {

    await openFolder( process.env.FOLDER_1)
        var minutes = 1, the_interval = minutes * 60 * 1000;
    setInterval(function () {
        var datetime = new Date();

        console.log("I am doing my 1 minutes check");
        console.log("TIME: "+datetime)
        openFolder(process.env.FOLDER_1)
    }, the_interval)

};


loadFoldersData();
getFromDB();