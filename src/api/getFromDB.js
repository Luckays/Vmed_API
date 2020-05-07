//function getFromDB get data from database to application
import express from 'express'
import bodyParser from'body-parser'
import moment from "moment"
import 'csv-express'
import CreateConnection from "../database/connection";
import post_data from "../database/post_data";
import post_download from "../database/post_download";
const connection = CreateConnection();
const app = express();
import cors from 'cors'
require('dotenv').config();
export default () => {
    app.use(bodyParser.json());
    app.listen(4000);

//expressvalidator
    app.use(cors());
    app.post('/data', (req, res) => {
   post_data(req,res,'SELECT datum,?? as sel_value FROM ?? WHERE datum >=? AND datum<=?')
    })

    app.post(process.env.DATA_ANALYSIS, (req, res) => {


        let analysis_type = req.body.group_type;

          switch (analysis_type) {
              case 'Průměr':
                  post_data(req, res, 'SELECT date_day,avg(??) as sel_value FROM ?? WHERE datum >=? AND datum<=? GROUP BY date_day')
                  break;
              case 'Součet':
                  post_data(req, res, 'SELECT date_day,sum(??) as sel_value FROM ?? WHERE datum >=? AND datum<=? GROUP BY date_day ')
                  break;
              case 'Maximum':
                  post_data(req, res, 'SELECT date_day,max(??) as sel_value FROM ?? WHERE datum >=? AND datum<=? GROUP BY date_day ')
                  break;
              case 'Minimum':
                  post_data(req, res, 'SELECT date_day,min(??) as sel_value FROM ?? WHERE datum >=? AND datum<=? GROUP BY date_day ')
                  break;
              case 'Vše':
                  post_data(req,res,'SELECT  day_time as date_day,?? as sel_value FROM ?? WHERE datum >=? AND datum<=?')
                  break;
        }
    })
    app.post(process.env.DATA_DOWNLOAD, (req, res) => {
        let analysis_type = req.body.group_type;
        switch (analysis_type) {
            case 'Průměr':
                post_download(req, res, 'SELECT date_day,avg(??) as sel_value FROM ?? WHERE datum >=? AND datum<=? GROUP BY date_day')
                break;
            case 'Součet':
                post_download(req, res, 'SELECT date_day,sum(??) as sel_value FROM ?? WHERE datum >=? AND datum<=? GROUP BY date_day ')
                break;
            case 'Maximum':
                post_download(req, res, 'SELECT date_day,max(??) as sel_value FROM ?? WHERE datum >=? AND datum<=? GROUP BY date_day ')
                break;
            case 'Minimum':
                post_download(req, res, 'SELECT date_day,min(??) as sel_value FROM ?? WHERE datum >=? AND datum<=? GROUP BY date_day ')
                break;
            case 'Vše':
                post_data(req,res,'SELECT day_time as date_day,?? as sel_value FROM ?? WHERE datum >=? AND datum<=?')
                break;
        }
        })

    app.get(process.env.DATA_TABLES, (req, res) => {
        connection.query('select * from selectable_tables', [], (err, rows) => {
            res.set({
                'Access-Control-Allow-Origin': '*'
            }).json(rows)
        })
    })

    app.post(process.env.DATA_COLUMNS, (req, res) => {
        if (req.body.table_name != '--') {
            const sql = 'show columns from ' + req.body.table_name;
            connection.query(sql, [], (err, rows) => {
                if (err) console.log(err);

                res.set({
                    'Access-Control-Allow-Origin': '*'
                }).json({
                    data: rows.map(c => c.Field).filter(c => c !== 'datum'&&c !== 'date_day'&&c !== 'day_time')
                })
            })
        }
    })
    /////////
    app.post(process.env.DATA_DAY, (req, res) => {
        connection.query('SELECT day_time,?? as sel_value FROM ?? WHERE date_day =?', [
                req.body.column,
                req.body.table_name,
                moment(req.body.date).format('L')
                ],
            (err, rows, fields) => {
                if (!err) {
                    res.attachment('filename.json');
                    res.set({
                        'Access-Control-Allow-Origin': '*'
                    }).send(rows);
                } else
                    console.log(err);
            })
    })

    app.post(process.env.DATA_DAY_R, (req, res) => {
        connection.query('SELECT day_time,?? as sel_value FROM ?? WHERE datum >=?', [
                req.body.column,
                req.body.table_name,
                moment(req.body.date).format('YYYY-MM-DD HH:mm:ss')
            ],
            (err, rows, fields) => {
                if (!err) {
                    res.attachment('filename.json');
                    res.set({
                        'Access-Control-Allow-Origin': '*'
                    }).send(rows);
                } else
                    console.log(err);
            })
    })

    app.post(process.env.DATA_DOWNLOAD_DAY, (req, res) => {
        connection.query('SELECT day_time,?? as sel_value FROM ?? WHERE date_day =?', [
                req.body.column,
                req.body.table_name,
                moment(req.body.date).format('L')
            ],
            (err, rows, fields) => {
                if (!err) {
                    res.attachment('filename.json');
                    res.set({
                        'Access-Control-Allow-Origin': '*'
                    }).csv(rows);
                } else
                    console.log(err);
            })
    })


}