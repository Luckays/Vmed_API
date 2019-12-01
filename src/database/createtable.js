import createConnection from "./connection";
export default function createtable() {
        let connection = createConnection();
                var sql = "CREATE TABLE IF NOT EXISTS txt_table ( datum VARCHAR(255),s1 VARCHAR(25), s2 VARCHAR(25), s3 VARCHAR(25),s4 VARCHAR(25),s5 VARCHAR(25),s6 VARCHAR(25), s7 VARCHAR(25),s8 VARCHAR(25), s9 VARCHAR(25))";
                connection.query(sql);
}
createtable();