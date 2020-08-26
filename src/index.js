import { config } from 'dotenv';
import { createServer } from './server';
import { watchFolders } from './service/loader';
import { invokeConnection } from './service/database';
import { addNull } from './service/loader/insertNull';


(async function () {
    config();
    await invokeConnection();
    console.log("ahoj")
    createServer(4840);
   watchFolders(process.env.FOLDERS.split(','), process.env.EXCLUDED.split(','),process.env.RINEX.split(','), 5 * 1000);
addNull()
    })();
