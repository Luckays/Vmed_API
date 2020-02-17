// make new table, or add column: EXAMPLE var sql= "ALTER TABLE txt_table  ADD (s9 VARCHAR(25))";, run separately
// is necessary have same number of column in database and in parseFile
import createConnection from './connection';
export default function createtable() {
    let connection = createConnection();
    var sql =
        'CREATE TABLE IF NOT EXISTS txt_table ( datum timestamp PRIMARY KEY NOT NULL ,date_day varchar(255), s1 double, s2 double, s3 double,s4 double,s5 double,s6 double, s7 double,s8 double, s9 double)';
    connection.query(sql);
    var sql =
        'CREATE TABLE IF NOT EXISTS all_table ( datum timestamp PRIMARY KEY NOT NULL,date_day varchar(255),  s1 double, s2 double, s3 double,s4 double,s5 double,s6 double, s7 double,s8 double, s9 double,s10 double,s11 double)';
    connection.query(sql);
    var sql =
        'CREATE TABLE IF NOT EXISTS mol_table (datum timestamp PRIMARY KEY NOT NULL,date_day varchar(255), s1 double, s2 double, s3 double,s4 double,s5 double,s6 double, s7 double,s8 double, s9 double)';
    connection.query(sql);
    var sql =
        'CREATE TABLE IF NOT EXISTS bud_table (datum timestamp PRIMARY KEY NOT NULL,date_day varchar(255), s1 double, s2 double, s3 double,s4 double,s5 double,s6 double, s7 double,s8 double, s9 double)';
    connection.query(sql);
    var sql =
        'CREATE TABLE IF NOT EXISTS vlh_table ( datum timestamp PRIMARY KEY NOT NULL,date_day varchar(255), s1 double, s2 double, s3 double,s4 double,s5 double,s6 double, s7 double,s8 double, s9 double)';
    connection.query(sql);
    var sql =
        'CREATE TABLE IF NOT EXISTS all_table2 ( datum timestamp PRIMARY KEY NOT NULL,date_day varchar(255),  s1 double, s2 double, s3 double,s4 double,s5 double,s6 double, s7 double,s8 double, s9 double,s10 double,s11 double)';
    connection.query(sql);
    var sql =
        'CREATE TABLE IF NOT EXISTS filename (fname VARCHAR(255) PRIMARY KEY,filesize double)';
    connection.query(sql);
    var sql =
        'CREATE TABLE IF NOT EXISTS selectable_tables ( name_table varchar(255)PRIMARY KEY NOT NULL, title varchar (255))';
    connection.query(sql);
   var sql = `INSERT IGNORE INTO selectable_tables VALUES ('all_table2', 'Data 1'),('mol_table','Data 2'),('all_table','Data 3'),('bud_table','Data 4'),('txt_table','Data 5'),('vlh_table','Data 6')`;
    connection.query(sql);
    /* var sql= "ALTER TABLE all_table  ADD (s11 double)"
        connection.query(sql);*/
}
createtable();
