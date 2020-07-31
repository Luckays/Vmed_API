import moment from 'moment';
import { getConnection } from '../service/database';
//send day data to real time
export function fetchDayDataVar(req, res) {
    getConnection().query(
        'SELECT datum,?? as teplota, ?? as tlak, ?? as vlhkost FROM ?? WHERE datum=(SELECT MAX(datum) FROM ??);',
        [
            req.body.column_teplota,
            req.body.column_tlak,
            req.body.column_vlhkost,
            req.body.table_name,
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
