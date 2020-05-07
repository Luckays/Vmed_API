import { getConnection } from '../service/database';
//get from db tables from db
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
