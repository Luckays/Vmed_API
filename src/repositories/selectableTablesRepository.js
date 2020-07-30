import { getConnection } from '../service/database';
//get from db tables from db
export function fetchAllSelectableTables() {
    return new Promise((resolve) => {
        getConnection().query(
            'select * from selectable_tables order by title',
            [],
            (err, rows) => {
                if (err) throw err;
                return resolve(rows);
            }
        );
    });
}
