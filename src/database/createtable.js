// make new table, or add column: EXAMPLE var sql= "ALTER TABLE txt_table  ADD (s9 VARCHAR(25))";, run separately
// is necessary have same number of column in database and in parseFile
import createConnection from "./connection";
export default function createtable() {
        let connection = createConnection();
                var sql = "CREATE TABLE IF NOT EXISTS txt_table ( datum VARCHAR(255),s1 VARCHAR(25), s2 VARCHAR(25), s3 VARCHAR(25),s4 VARCHAR(25),s5 VARCHAR(25),s6 VARCHAR(25), s7 VARCHAR(25),s8 VARCHAR(25), s9 VARCHAR(25))";
                connection.query(sql);
        var sql = "CREATE TABLE IF NOT EXISTS all_table ( datum VARCHAR(255),s1 VARCHAR(25), s2 VARCHAR(25), s3 VARCHAR(25),s4 VARCHAR(25),s5 VARCHAR(25),s6 VARCHAR(25), s7 VARCHAR(25),s8 VARCHAR(25), s9 VARCHAR(25))";
        connection.query(sql);
        var sql = "CREATE TABLE IF NOT EXISTS mol_table ( datum VARCHAR(255),s1 VARCHAR(25), s2 VARCHAR(25), s3 VARCHAR(25),s4 VARCHAR(25),s5 VARCHAR(25),s6 VARCHAR(25), s7 VARCHAR(25),s8 VARCHAR(25), s9 VARCHAR(25))";
        connection.query(sql);
        var sql = "CREATE TABLE IF NOT EXISTS bud_table ( datum VARCHAR(255),s1 VARCHAR(25), s2 VARCHAR(25), s3 VARCHAR(25),s4 VARCHAR(25),s5 VARCHAR(25),s6 VARCHAR(25), s7 VARCHAR(25),s8 VARCHAR(25), s9 VARCHAR(25))";
        connection.query(sql);
        var sql = "CREATE TABLE IF NOT EXISTS vlh_table ( datum VARCHAR(255),s1 VARCHAR(25), s2 VARCHAR(25), s3 VARCHAR(25),s4 VARCHAR(25),s5 VARCHAR(25),s6 VARCHAR(25), s7 VARCHAR(25),s8 VARCHAR(25), s9 VARCHAR(25))";
        connection.query(sql);
        var sql = "CREATE TABLE IF NOT EXISTS filename ( s1 VARCHAR(25))";
        connection.query(sql);



}
createtable();