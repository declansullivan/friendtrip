var express = require('express');
const { Item } = require('../db/models/item');
var router = express.Router();

// Shouldn't need to specify Personal and Group Items,
// the database doesn't care, the boolean only determines whether or not
// the data is shown.

router.post('/getItem', function(req, res, next) {
    res.send("Not Implemented!");
});

router.post('/getItems', function(req, res, next) {
    res.send("Not Implemented!");
});

router.put('/addItem', function(req, res, next) {
    res.send("Not Implemented!");
});

router.post('/editItem', function(req, res, next) {
    res.send("Not Implemented!");
});

router.delete('/deleteItem', function(req, res, next) {
    res.send("Not Implemented!");
});

router.post('/checkoffItem', function(req, res, next) {
    res.send("Not Implemented!");
});

router.post('/sendReminder', function(req, res, next) {
    res.send("Not Implemented!");
});

module.exports = router;
