// make new table, or add column: EXAMPLE var sql= "ALTER TABLE txt_table  ADD (s9 VARCHAR(25))";, run separately
// is necessary have same number of column in database and in parseFile
import createConnection from "./connection";
export default function createtable() {
        let connection = createConnection();
        var sql = "CREATE TABLE IF NOT EXISTS txt_table ( datum timestamp PRIMARY KEY NOT NULL ,s1 double, s2 double, s3 double,s4 double,s5 double,s6 double, s7 double,s8 double, s9 double)";
        connection.query(sql);
        var sql = "CREATE TABLE IF NOT EXISTS all_table ( datum timestamp PRIMARY KEY NOT NULL, s1 double, s2 double, s3 double,s4 double,s5 double,s6 double, s7 double,s8 double, s9 double,s10 double,s11 double)";
        connection.query(sql);
        var sql = "CREATE TABLE IF NOT EXISTS mol_table (datum timestamp PRIMARY KEY NOT NULL,s1 double, s2 double, s3 double,s4 double,s5 double,s6 double, s7 double,s8 double, s9 double)";
        connection.query(sql);
        var sql = "CREATE TABLE IF NOT EXISTS bud_table (datum timestamp PRIMARY KEY NOT NULL,s1 double, s2 double, s3 double,s4 double,s5 double,s6 double, s7 double,s8 double, s9 double)";
        connection.query(sql);
        var sql = "CREATE TABLE IF NOT EXISTS vlh_table ( datum timestamp PRIMARY KEY NOT NULL,s1 double, s2 double, s3 double,s4 double,s5 double,s6 double, s7 double,s8 double, s9 double)";
        connection.query(sql);
        var sql = "CREATE TABLE IF NOT EXISTS filename (name VARCHAR(25) PRIMARY KEY,filesize double)";
        connection.query(sql);
       /* var sql= "ALTER TABLE all_table  ADD (s11 double)"
        connection.query(sql);*/


}
createtable();