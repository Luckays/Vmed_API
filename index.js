//function of index set name of folder, excerpt data, start openFolder
import express from 'express'
import openFolder from "./src/openFolder";
const app = express();
app.listen(50000);

let data = openFolder('data')//.then(() => {
//console.log(resolve)
        var minutes = 1, the_interval = minutes * 60 * 1000;
        setInterval(function () {
            console.log("I am doing my 1 minutes check");
            openFolder('data')

        }, the_interval);

//}).catch((error) => {
   // console.log("error index")

//})

app.get('/jedem', function (req, res) {
    res.send(data);

});