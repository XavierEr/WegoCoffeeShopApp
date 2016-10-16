var express = require('express');
var mongo = require('mongodb');

var router = express.Router();

const collectionName = 'beverages';

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

router.get('/:beverageId', function (req, res) {
    var o_id = new mongo.ObjectID(req.params.beverageId);

    req.db(function (db) {
        db.collection(collectionName).findOne({ _id: o_id }).then(function (doc) {
            res.json(doc);
        });
        db.close();
    });
});

router.post('/', function (req, res) {
    if (!req.body.name || req.body.name === '' || !req.body.type || req.body.type === '') {
        res.sendStatus(400);
        return;
    }

    var o_id = new mongo.ObjectID();
    req.body._id = o_id;

    req.db(function (db) {
        db.collection(collectionName).findOne({ name: req.body.name }).then(function (doc) {
            if (!doc) {
                db.collection(collectionName).insertOne(req.body).then(function (r) {
                    if (r.insertedCount === 1) {
                        res.sendStatus(201);
                    } else {
                        res.sendStatus(400);
                    }
                });
            } else {
                res.status(500).json({ error: 'Drink exist!' });
            }
        });
        db.close();
    });
});

router.delete('/:beverageId', function (req, res) {
    var o_id = new mongo.ObjectID(req.params.beverageId);

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