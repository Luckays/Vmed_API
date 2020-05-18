import { config } from 'dotenv';
import { createServer } from './src/server';
import { watchFolders } from './src/service/loader';
import { invokeConnection } from './src/service/database';

(async function () {
    config();
    await invokeConnection(); 
    createServer(4840);
    watchFolders(process.env.FOLDERS.split(','), process.env.EXCLUDED.split(','), 5 * 1000);
})();
