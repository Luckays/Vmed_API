import express from 'express'
import path from 'path'
import openFolder from "./src/openFolder";
const app = express();
app.listen(5000);


let a = openFolder('data');














app.get('/jedem', function (req, res) {
    res.send(a);
});