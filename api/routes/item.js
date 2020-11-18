var express = require('express');
const { ItemDB } = require('../db/models/item');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.send("Item API.");
});

router.put('/addItem', function(req, res, next) {
    res.send("Not Implemented!");
});

router.get('/viewGroupList', function(req, res, next) {
    res.send("Not Implemented!");
});

router.get('/viewPersonalList', function(req, res, next) {
    res.send("Not Implemented!");
});

router.get('/viewShoppingList', function(req, res, next) {
    res.send("Not Implemented!");
});

router.delete('/deleteGroupItem', function(req, res, next) {
    res.send("Not Implemented!");
});

router.delete('/deletePersonalItem', function(req, res, next) {
    res.send("Not Implemented!");
});

router.post('/checkoffGroupItem', function(req, res, next) {
    res.send("Not Implemented!");
});

router.post('/checkoffPersonalItem', function(req, res, next) {
    res.send("Not Implemented!");
});

router.post('/sendReminder', function(req, res, next) {
    res.send("Not Implemented!");
});

module.exports = router;
