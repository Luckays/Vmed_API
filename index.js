import { config } from 'dotenv';
import { createServer } from './src/server';
import { watchFolders } from './src/service/loader';
import { invokeConnection } from './src/service/database';
import * as Sentry from '@sentry/node'


(async function () {
    config();
    Sentry.init({ dsn: 'https://cc89270695804a59be08db183c9b938d@o428131.ingest.sentry.io/5373154' });
    await invokeConnection();
    createServer(4840);
        watchFolders(process.env.FOLDERS.split(','), process.env.EXCLUDED.split(','),process.env.RINEX.split(','), 5 * 1000);
    })();
