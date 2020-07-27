import { getConnection } from '../service/database';

//send day data to see columns
export function fetchSelectableColumns(req, res) {
    if (req.body.table_name === '--') {
        return res.status(400).json({
            message: 'Wrong table name',
        });
    }

    const query = 'show columns from ' + req.body.table_name;
    getConnection().query(query, [], (err, rows) => {
        // TODO: predelat na vraceni chybove response
        if (err) return console.log(err);


        return res
            .set({
                'Access-Control-Allow-Origin': '*',
            })
            .json({
                data: rows
                    .map((c) => c.Field)
                    .filter(
                        (c) =>
                            c !== 'datum' &&
                            c !== 'date_day' &&
                            c !== 'day_time'
                    ),
            });
    });
}
