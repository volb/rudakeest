const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = 3001;
const balkhiate = require('balkhiate');

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '..', 'client', 'build')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
});

const test = balkhiate.scrapePoem("rumi");

app.get('/poems', (req, res) => {
    return res.send(test);
});
const testB = test.then((result) => console.log(result));
 
app.listen(port,testB);
