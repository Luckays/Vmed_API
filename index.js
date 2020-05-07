import { config } from 'dotenv';
import { createServer } from './src/server';
import { watchFolders } from './src/service/loader';
import { invokeConnection } from './src/service/database';

(async function () {
    config();
    await invokeConnection();
    createServer(4000);
    watchFolders(process.env.FOLDERS.split(','), 60 * 1000);
})();
