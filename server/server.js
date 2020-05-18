require('dotenv').config();

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
    //return res.send(test);
    test.then(res.send.bind(res));
});
const testB = test.then((result) => console.log(result));
console.log(test);
console.log(process.env.STANDS4_API_UID);
app.listen(port);
