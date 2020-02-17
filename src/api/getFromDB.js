//function getFromDB get data from database to application
import express from 'express'
import bodyParser from'body-parser'
import moment from "moment"

import CreateConnection from "../database/connection";
const connection = CreateConnection();
const app = express();

export default () => {
    app.use(bodyParser.json());
    app.listen(4000);
//expressvalidator

    app.post('/data', (req, res) => {//switch
      //  console.log(req.body)
       connection.query('SELECT datum,?? FROM ?? WHERE datum >=? AND datum<=?', [
           req.body.column,
           req.body.table_name,
           moment(req.body.from_date).format('YYYY-MM-DD HH:mm:ss'),
           moment(req.body.to_date).format('YYYY-MM-DD HH:mm:ss')
       ],
           (err, rows, fields) => {
            if (!err)
                res.set({
                    'Access-Control-Allow-Origin': '*'
                }).send(rows);
            else
                console.log(err);
        })
    })

    app.post('/fce', (req, res) => {


        let analysis_type = req.body.group_type;
        console.log(analysis_type );

          switch (analysis_type) {
            case 'Průměr':
               // connection.query('SELECT date_day,avg (??)FROM ?? WHERE datum >=? AND datum<=?', [
                connection.query('SELECT date_day,avg (??) FROM ?? GROUP BY date_day', [
                    req.body.column,
                        req.body.table_name,
                        moment(req.body.from_date).format('YYYY-MM-DD HH:mm:ss'),
                        moment(req.body.to_date).format('YYYY-MM-DD HH:mm:ss')
                    ],
                    (err, rows, fields) => {
                        if (!err)
                            res.set({
                                'Access-Control-Allow-Origin': '*'
                            }).send(rows);
                        else
                            console.log(err);
                    })
                break;
            case 'Součet':
                connection.query('SELECT date_day,sum (??) FROM ?? GROUP BY date_day ', [
                        req.body.column,
                        req.body.table_name,
                        moment(req.body.from_date).format('YYYY-MM-DD HH:mm:ss'),
                        moment(req.body.to_date).format('YYYY-MM-DD HH:mm:ss')
                    ],
                    (err, rows, fields) => {
                        if (!err)
                            res.set({
                                'Access-Control-Allow-Origin': '*'
                            }).send(rows);
                        else
                            console.log(err);
                    })

                break;
            case 'Maximum':
                connection.query('SELECT date_day,max (??) FROM ?? GROUP BY date_day ', [
                        req.body.column,
                        req.body.table_name,
                        moment(req.body.from_date).format('YYYY-MM-DD HH:mm:ss'),
                        moment(req.body.to_date).format('YYYY-MM-DD HH:mm:ss')
                    ],
                    (err, rows, fields) => {
                        if (!err)
                            res.set({
                                'Access-Control-Allow-Origin': '*'
                            }).send(rows);
                        else
                            console.log(err);
                    })
                break;
            case 'Minimum':
                connection.query('SELECT date_day,min (??) FROM ?? GROUP BY date_day ', [
                        req.body.column,
                        req.body.table_name,
                        moment(req.body.from_date).format('YYYY-MM-DD HH:mm:ss'),
                        moment(req.body.to_date).format('YYYY-MM-DD HH:mm:ss')
                    ],
                    (err, rows, fields) => {
                        if (!err)
                            res.set({
                                'Access-Control-Allow-Origin': '*'
                            }).send(rows);
                        else
                            console.log(err);
                    })
                break;
        }
    })

    app.get('/tables', (req, res) => {
        connection.query('select * from selectable_tables', [], (err, rows) => {
            res.set({
                'Access-Control-Allow-Origin': '*'
            }).json(rows)
        })
    })

    app.post('/columns', (req, res) => {
        if (req.body.tableName != '--') {
            const sql = 'show columns from ' + req.body.tableName;
            connection.query(sql, [], (err, rows) => {
                if (err) console.log(err);

                res.set({
                    'Access-Control-Allow-Origin': '*'
                }).json({
                    data: rows.map(c => c.Field).filter(c => c !== 'datum')
                })
            })
        }
    })
}