import { getConnection } from './index';
//old createTable - create or update tables in db
export function runMigrations() {
    const connection = getConnection();

    var sql =
        'CREATE TABLE IF NOT EXISTS txt_table ( datum timestamp PRIMARY KEY NOT NULL ,date_day varchar(255),day_time varchar(255),  teplota_u_GPS_anteny double, tlak_u_GPS_anteny double, vlhkost_u_GPS_anteny double,cteni_teploty double,cteni_tlaku double,cteni_vlhkosti double)';
    connection.query(sql);
    var sql =
        'CREATE TABLE IF NOT EXISTS all_table ( datum timestamp PRIMARY KEY NOT NULL,date_day varchar(255),day_time varchar(255), indikator_srazek double, uhrn_srazek double, teplota_u_GPS_anteny double,tlak_u_GPS_anteny double,vlhkost_u_GPS_anteny double,vyska_hladiny_ve_studni double,teplota_v_prizemi double, tlak_u_GPS_anteny_kontrolni double, teplota_u_GPS_anteny_kontrolni double,vlhkost_v_registracni_mistnosti double,teplota_v_kompresovne double,vlhkost_v_kompresovne double,tlak_v_kompresovne double,vyska_hladiny_ve_vrtu_29m double,hloubka_vody_ve_vrtu_29m double, hloubka_vody_ve_studni double, vyska_hladiny_ve_vrtu_25m double, hloubka_vody_ve_vrtu_25m double,rychlost_vetru double, smer_vetru double, cteni_rychlosti_vetru double)';
    connection.query(sql);
    var sql =
        'CREATE TABLE IF NOT EXISTS bgl_table (datum timestamp PRIMARY KEY NOT NULL,date_day varchar(255),day_time varchar(255),  hodnota1 double,hodnota2 double,hodnota3 double,hodnota4 double,hodnota5 double,hodnota6 double,hodnota7 double,hodnota8 double,hodnota9 double,hodnota10 double,hodnota11 double,hodnota12 double,hodnota13 double,hodnota14 double,hodnota15 double,hodnota16 double,hodnota17 double,hodnota18 double,hodnota19 double)';
    connection.query(sql);
    var sql =
        'CREATE TABLE IF NOT EXISTS bud_table (datum timestamp PRIMARY KEY NOT NULL,date_day varchar(255),day_time varchar(255),  teplota_v_prizemi double, teplota_v_pruzinove_komore double, vlhkost_v_pruzinove_komore double,teplota_v_supravodive_komore double,vlhkost_v_supravodive_komore double, tlak_v_supravodive_komore double, teplota_v_registracni_mistnosti double,vlhkost_v_registracni_mistnosti double, teplota_v_kompresovne double,vlhkost_v_kompresovne double,tlak_v_kompresovne double,teplota_v_gravimetricke_laboratori double,vlhkost_v_gravimetricke_laboratori double, teplota_v_serverovne double,teplota_v_UPS_mistnosti double, teplota_v_GNNS_mistnosti double, teplota_v_termokomore double)';
    connection.query(sql);
    var sql =
        'CREATE TABLE IF NOT EXISTS vlh_table ( datum timestamp PRIMARY KEY NOT NULL,date_day varchar(255),day_time varchar(255),vlhkost_pudy_MP_12cm double,vlhkost_pudy_MP_31cm double,vlhkost_pudy_MP_60cm double,vlhkost_pudy_MP_86cm double,vlhkost_pudy_MP_120cm double,vlhkost_pudy_MP_80cm_svisle double, vlhkost_pudy_Z_15cm double,  vlhkost_pudy_Z_52cm double, vlhkost_pudy_Z_91cm double, vlhkost_pudy_S_14cm double, vlhkost_pudy_S_56cm double,  vlhkost_pudy_S_91cm double,vyska_hladiny_ve_studni double, vyska_hladiny_ve_vrtu_29m double,hloubka_vody_ve_studni double,hloubka_vody_ve_vrtu_29m double,vyska_hladiny_ve_vrtu_25m double, hloubka_vody_ve_vrtu_25m double)';
    connection.query(sql);
    var sql =
        'CREATE TABLE IF NOT EXISTS vgl_table ( datum timestamp PRIMARY KEY NOT NULL,date_day varchar(255),day_time varchar(255),hodnota1 double,hodnota2 double,hodnota3 double,hodnota4 double,hodnota5 double,hodnota6 double,hodnota7 double,hodnota8 double,hodnota9 double,hodnota10 double,hodnota11 double,hodnota12 double,hodnota13 double,hodnota14 double,hodnota15 double,hodnota16 double,hodnota17 double,hodnota18 double,hodnota19 double,hodnota20 double,hodnota21 double,hodnota22 double,hodnota23 double,hodnota24 double,hodnota25 double)';
    connection.query(sql);
    var sql =
        'CREATE TABLE IF NOT EXISTS filename (fname VARCHAR(255) PRIMARY KEY,filesize double)';
    connection.query(sql);
    var sql =
        'CREATE TABLE IF NOT EXISTS selectable_tables ( name_table varchar(255)PRIMARY KEY NOT NULL, title varchar (255))';
    connection.query(sql);
    var sql = `INSERT IGNORE INTO selectable_tables VALUES ('vgl_table','Vlhkosti půdy'),('bgl_table','Čidla v budově'),('all_table','Minutová data'),('bud_table','Čidla v budově'),('txt_table','Základní meteo'),('vlh_table','Vlhkosti půdy')`;
    connection.query(sql);
    var sql =
        'CREATE TABLE IF NOT EXISTS dates ( hodina timestamp PRIMARY KEY NOT NULL,den varchar(255),mesic varchar(255),rok varchar (255))';
    connection.query(sql);
}
