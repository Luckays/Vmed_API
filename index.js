//function of index set name of folder, excerpt data, start openFolder
import express from 'express'
import path from 'path'
import openFolder from "./src/openFolder";
const app = express();
app.listen(3000);

let data = openFolder('data').then((data)=>{
    console.log(data)
});
app.get('/jedem', function (req, res) {
    res.send(data);

});