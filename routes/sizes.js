var express = require('express');
var mongo = require('mongodb');

var router = express.Router();

const collectionName = 'sizes';

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

router.get('/:sizeId', function (req, res) {
    var o_id = new mongo.ObjectID(req.params.sizeId);

    req.db(function (db) {
        db.collection(collectionName).findOne({ _id: o_id }).then(function (doc) {
            res.json(doc);
        });
        db.close();
    });
});

router.post('/', function (req, res) {
    if (!req.body.name || req.body.name === '') {
        res.sendStatus(400);
        return;
    }

    var o_id = new mongo.ObjectID();
    req.body._id = o_id;

    req.db(function (db) {
        db.collection(collectionName).insertOne(req.body).then(function (r) {
            if (r.insertedCount === 1) {
                res.status(201).send(o_id);
            } else {
                res.sendStatus(400);
            }
        });
        db.close();
    });
});

router.delete('/:sizeId', function (req, res) {
    var o_id = new mongo.ObjectID(req.params.sizeId);

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