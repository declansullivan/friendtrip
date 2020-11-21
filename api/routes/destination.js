var express = require('express');
var Destination = require('../db/models/destination');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.send("Destination API.");
});

router.put('/addDestination', function(req, res, next) {
    res.send("Not Implemented!");
});

router.get('/viewDestination', function(req, res, next) {
    res.send("Not Implemented!");
});

router.post('/editDestination', function(req, res, next) {
    res.send("Not Implemented!");
});

router.delete('/deleteDestination', function(req, res, next) {
    res.send("Not Implemented!");
});

module.exports = router;
