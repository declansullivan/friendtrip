var express = require('express');
var Destination = require('../db/models/destination');
var router = express.Router();

router.post('/getDestination', function(req, res, next) {
    res.send("Not Implemented!");
});

router.post('/getDestinations', function(req, res, next) {
    res.send("Not Implemented!");
});

router.put('/addDestination', function(req, res, next) {
    res.send("Not Implemented!");
});

router.post('/editDestination', function(req, res, next) {
    res.send("Not Implemented!");
});

router.delete('/deleteDestination', function(req, res, next) {
    res.send("Not Implemented!");
});

module.exports = router;
