var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var MongoClient = require('mongodb').MongoClient;
const connectionString = 'mongodb://operator:qwerty123@ds048319.mlab.com:48319/wegocoffeeshop';

var index = require('./routes/index');
var sizes = require('./routes/sizes');
var beverages = require('./routes/beverages');
var condiments = require('./routes/condiments');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(function (req, res, next) {
    req.db = function (callback) {
        MongoClient.connect(connectionString, function (err, db) {
            if (err) {
                throw err;
            }
            return callback(db);
        });
    }
    next();
});

app.use('/', index);
app.use('/sizes', sizes);
app.use('/beverages', beverages);
app.use('/condiments', condiments);

app.use(express.static('public'));
app.listen(3000)