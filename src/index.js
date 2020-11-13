import { config } from 'dotenv';
import { createServer } from './server';
import { watchFolders } from './service/loader';
import { invokeConnection } from './service/database';
import { addNull } from './service/loader/insertNull';

//index

(async function () {
    config();
    await invokeConnection();
    console.log("ahoj")
    createServer(4840);
    watchFolders(process.env.FOLDERS.split(','), process.env.EXCLUDED.split(','),process.env.RINEX.split(','), 5 * 1000);
    console.log(process.env.FOLDERS.split(','));
    let day = 1, the_interval = day *24*60* 60 * 1000;
    let date = new Date();
    addNull(new Date(2000,1,1,24))
    setInterval(function () {
        addNull(date.setDate(date.getDate() - 8))
    }, the_interval)


    })();
