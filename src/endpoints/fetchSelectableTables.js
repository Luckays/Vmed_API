import { fetchAllSelectableTables } from '../repositories/selectableTablesRepository';

export async function fetchSelectableTables(req, res) {
    const selectableTables = await fetchAllSelectableTables();
    return res
        .set({
            'Access-Control-Allow-Origin': '*',
        })
        .json(selectableTables);
}
