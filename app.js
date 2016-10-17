var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var MongoClient = require('mongodb').MongoClient;
const connectionString = 'mongodb://operator:qwerty123@ds048319.mlab.com:48319/wegocoffeeshop';

var index = require('./routes/index');
var sizes = require('./routes/sizes');
var beverages = require('./routes/beverages');
var condiments = require('./routes/condiments');
var orders = require('./routes/orders');

var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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
app.use('/api/sizes', sizes);
app.use('/api/beverages', beverages);
app.use('/api/condiments', condiments);
app.use('/api/orders', orders);

// app.use('/lib', express.static(__dirname + '/public/lib'));
app.use('/src', express.static(__dirname + '/public/src'));
app.use('/css', express.static(__dirname + '/public/css'));
// app.use(express.static('public'));
app.listen(app.get('port'), function () {
    console.log('Node app is running on port', app.get('port'));
});