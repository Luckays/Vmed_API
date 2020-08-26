    import { storeFileData } from '../../repositories/importedFileRepository';

    const moment = require('moment');
import {parse} from './parser'
import {getTableName} from './parser';
import {getNumberOfColumns} from './parser';
 export async function addNull() {
     let tableName = ['all_table', 'txt_table', 'olomouc_all_table', 'ostrava_rinex_table','polom_all_table', 'vlh_table', 'vgl_table', 'bgl_table', 'kunzak_all_table', 'brno_all_table', 'mol_table', 'bud_table', 'plzen_all_table', 'plzen_txt_table']

     for (let k = 0; k < tableName.length; k++) {
         let startDate = date.setDate(date.getDate() - 8)
         let date = new Date();
         let stopDate = date.setDate(date.getDate() - 7)
         let nullFormat = getDates(startDate, stopDate)
         const parsedLines = [];


         const numberOfRows = getNumberOfColumns(tableName[k]);

         for (let i = 0; i < nullFormat.length; i++) {
             parsedLines.push(
                 parse(
                     nullFormat[i].split(',').filter((item) => item !== ''),
                     numberOfRows
                 )
             );

         }
         console.log(tableName[k])
         await storeFileData(" ",tableName[k],parsedLines)


     }

 }



function getDates(startDate, stopDate) {
    var dateArray = [];
    var currentDate = moment(startDate);
    var stopDate = moment(stopDate);
    while (currentDate <= stopDate) {
        dateArray.push( moment(currentDate).format('YYYY,MM,DD,hh,mm,ss') )
        currentDate = moment(currentDate).add(1, 'days');
    }
    return dateArray;
}