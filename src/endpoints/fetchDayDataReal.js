import moment from 'moment';
import { getConnection } from '../service/database';
//send day data to real time
export function fetchDayDataReal(req, res) {
    getConnection().query(
        'SELECT day_time,?? as sel_value FROM ?? WHERE datum >=?',
        [
            req.body.column,
            req.body.table_name,
            moment(req.body.date).format('YYYY-MM-DD HH:mm:ss'),
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
