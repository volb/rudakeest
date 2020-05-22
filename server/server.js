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

//const test = balkhiate.scrapePoem("rumi");
/*
app.get('/poems', (req, res) => {
    test.then(res.send.bind(res));
});
*/
/*
app.get('/poems', async function(req, res) {
    let data = await balkhiate.scrapePoem("rumi");
    res.json(data);
})
*/
//const testB = test.then((result) => console.log(result));

app.listen(port);
