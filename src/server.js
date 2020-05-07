import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { fetchSelectableTables } from './endpoints/fetchSelectableTables';
import { fetchSelectableColumns } from './endpoints/fetchSelectableColumns';
import { fetchDayData } from './endpoints/fetchDayData';
import { fetchDayDataReal } from './endpoints/fetchDayDataReal';
import { fetchDayDataDownload } from './endpoints/fetchDayDataDownload';
import {
    fetchData,
    fetchDataAnalysis,
    fetchDataDownload,
} from './endpoints/fetchData';

export function createServer(port) {
    const app = express();
    app.use(bodyParser.json());
    app.use(cors());

    app.post('/data', fetchData);
    app.post('/data_analysis', fetchDataAnalysis);
    app.post('/download', fetchDataDownload);

    app.get('/table', fetchSelectableTables);
    app.post('/column', fetchSelectableColumns);
    app.post('/data_day', fetchDayData);
    app.post('/data_day_real', fetchDayDataReal);
    app.post('/dday', fetchDayDataDownload);

    app.listen(port);
    console.log(`Server is running on port ${port}`);
}
