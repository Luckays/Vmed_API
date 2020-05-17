import moment from 'moment';
import { getConnection } from '../service/database';
import 'csv-express'
// old getFromDB

//send data to graph
function sendData(req, res, query) {
    getConnection().query(
        query,
        [
            req.body.column,
            req.body.table_name,
            moment(req.body.from_date).format('YYYY-MM-DD HH:mm:ss'),
            moment(req.body.to_date).format('YYYY-MM-DD HH:mm:ss'),
        ],
        (err, rows) => {
            // TODO: predelat na vraceni chybove response
            if (err) return console.log(err);

            res.attachment('filename.json');
            res.set({
                'Access-Control-Allow-Origin': '*',
            }).send(rows);
        }
    );
}
//send data to download
function sendDownloadData(req, res, query) {
    getConnection().query(
        query,
        [
            req.body.column,
            req.body.table_name,
            moment(req.body.from_date).format('YYYY-MM-DD HH:mm:ss'),
            moment(req.body.to_date).format('YYYY-MM-DD HH:mm:ss'),
        ],
        (err, rows) => {
            // TODO: predelat na vraceni chybove response
            if (err) return console.log(err);

            res.attachment('filename.json');
            res.set({
                'Access-Control-Allow-Origin': '*',
            }).csv(rows);
        }
    );
}
//send default data
export function fetchData(req, res) {
    return sendData(
        req,
        res,
        'SELECT datum,?? as sel_value FROM ?? WHERE datum >=? AND datum<=?'
    );
}
//send long-term data to chart
export function fetchDataAnalysis(req, res) {
    let analysis_type = req.body.group_type;

    switch (analysis_type) {
        case 'Průměr':
            return sendData(
                req,
                res,
                'SELECT date_day,avg(??) as sel_value FROM ?? WHERE datum >=? AND datum<=? GROUP BY date_day'
            );

        case 'Součet':
            return sendData(
                req,
                res,
                'SELECT date_day,sum(??) as sel_value FROM ?? WHERE datum >=? AND datum<=? GROUP BY date_day '
            );

        case 'Maximum':
            return sendData(
                req,
                res,
                'SELECT date_day,max(??) as sel_value FROM ?? WHERE datum >=? AND datum<=? GROUP BY date_day '
            );

        case 'Minimum':
            return sendData(
                req,
                res,
                'SELECT date_day,min(??) as sel_value FROM ?? WHERE datum >=? AND datum<=? GROUP BY date_day '
            );

        case 'Vše':
            return sendData(
                req,
                res,
                'SELECT  day_time as date_day,?? as sel_value FROM ?? WHERE datum >=? AND datum<=?'
            );
    }
}
//send long-term data to download
export function fetchDataDownload(req, res) {
    let analysis_type = req.body.group_type;

    switch (analysis_type) {
        case 'Průměr':
            return sendDownloadData(
                req,
                res,
                'SELECT date_day,avg(??) as sel_value FROM ?? WHERE datum >=? AND datum<=? GROUP BY date_day'
            );

        case 'Součet':
            return sendDownloadData(
                req,
                res,
                'SELECT date_day,sum(??) as sel_value FROM ?? WHERE datum >=? AND datum<=? GROUP BY date_day '
            );

        case 'Maximum':
            return sendDownloadData(
                req,
                res,
                'SELECT date_day,max(??) as sel_value FROM ?? WHERE datum >=? AND datum<=? GROUP BY date_day '
            );

        case 'Minimum':
            return sendDownloadData(
                req,
                res,
                'SELECT date_day,min(??) as sel_value FROM ?? WHERE datum >=? AND datum<=? GROUP BY date_day '
            );

        case 'Vše':
            return sendDownloadData(
                req,
                res,
                'SELECT day_time as date_day,?? as sel_value FROM ?? WHERE datum >=? AND datum<=?'
            );
    }
}
