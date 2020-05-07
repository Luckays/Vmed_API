import { getConnection } from '../service/database';

export function fetchAllSelectableTables() {
    return new Promise((resolve) => {
        getConnection().query(
            'select * from selectable_tables',
            [],
            (err, rows) => {
                if (err) throw err;
                return resolve(rows);
            }
        );
    });
}
