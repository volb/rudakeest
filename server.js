const express = require('express');
const path = require('path');
const app = express();
const port = 3001;
const balkhiate = require('balkhiate');
app.use(express.static(path.join(__dirname, '/build')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname+'/build/index.html'));
});
const test = balkhiate.scrapePoem("rumi");
const testB = test.then((result) => console.log(result));
// below does not work
let something = async() => {
    let result = await balkhiate.scrapePoem();
    return result;
 }
 
app.listen(port,testB);
