import CreateConnection from "../database/connection";
import moment from "moment";
const connection = CreateConnection();

export default (req,res,sql) => {
    connection.query(sql, [
            req.body.column,
            req.body.table_name,
            moment(req.body.from_date).format('YYYY-MM-DD HH:mm:ss'),
            moment(req.body.to_date).format('YYYY-MM-DD HH:mm:ss')
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
}