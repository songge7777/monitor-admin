const express = require('express')

const app = express()

const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.json())
app.use(cors());

app.get('/index.js', (req,res) => {
    res.json('123')
})

app.post('/upload.js', (req, res) => {
    const data = req.body;
    console.log('data', data);
    res.json('123')
})

app.listen('8080', () => { 
    console.log('serve')
})