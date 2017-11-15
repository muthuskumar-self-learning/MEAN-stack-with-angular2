const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const config = require('./config/database')

const port = 8080;
const app = express();

mongoose.Promise = global.Promise;
mongoose.createConnection(config.uri, (err) => {
    if (err) {
        consoloe.log('Unable to connect to database: ', this.err);
    } else {
        console.log('Connected to database: ' , config.db);
    }
});

app.use(express.static(__dirname + '/client/dist'));
app.get('*', (req, res) => {
    res.sendFile(__dirname + '/client/dist/index.html');
});

app.listen(port, () => {
    console.log("Server running at port ", port);
});