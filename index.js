const path = require('path');
const express = require('express');
const app = express();
const router = express.Router();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const config = require('./config/database')
const authentication = require('./routes/authentication')(router);

const port = 8080;

mongoose.Promise = global.Promise;
mongoose.connect(config.uri, (err) => {
    if (err) {
        console.log('Unable to connect to database: ', this.err);
    } else {
        console.log('Connected to database: ' , config.db);
    }
});

app.use(cors({
    origin: 'http://localhost:4200'
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/client/dist'));
app.use('/authentication', authentication);

app.get('*', (req, res) => {
    res.sendFile(__dirname + '/client/dist/index.html');
});

app.listen(port, () => {
    console.log("Server running at port ", port);
});
