var express = require('express');
var mongo = require('mongodb');

var router = express.Router();

const collectionName = 'orders';

router.get('/', function (req, res) {
    req.db(function (db) {
        db.collection(collectionName).find().toArray(function (err, result) {
            if (err) {
                throw err;
            }
            res.json(result);
        });
        db.close();
    });
});

router.get('/:orderId', function (req, res) {
    var o_id = new mongo.ObjectID(req.params.orderId);

    req.db(function (db) {
        db.collection(collectionName).findOne({ _id: o_id }).then(function (doc) {
            res.json(doc);
        });
        db.close();
    });
});

router.post('/', function (req, res) {
    if (!req.body.beverage ||
        req.body.beverage === '' ||
        !req.body.type ||
        req.body.type === '' ||
        !req.body.size ||
        req.body.size === '' ||
        !req.body.totalPrice ||
        isNaN(req.body.totalPrice)) {
        res.sendStatus(400);
        return;
    }

    req.db(function (db) {
        db.collection(collectionName).insertOne(req.body).then(function (r) {
            if (r.insertedCount === 1) {
                res.sendStatus(201);
            } else {
                res.sendStatus(400);
            }
        });
        db.close();
    });
});

router.delete('/:orderId', function (req, res) {
    var o_id = new mongo.ObjectID(req.params.orderId);

    req.db(function (db) {
        db.collection(collectionName).findOneAndDelete({ _id: o_id }).then(function (result) {
            if (result.lastErrorObject.n === 1) {
                res.sendStatus(200);
            } else {
                res.sendStatus(404);
            }
        });
        db.close();
    });
});

module.exports = router;