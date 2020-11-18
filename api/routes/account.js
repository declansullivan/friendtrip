var express = require('express');
const { TravelerDB } = require('../db/models/traveler');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.send("Accounts page.");
//   res.render('account', { title: 'Express' });
});

router.post('/editAccount', function(req, res, next) {
    res.send("Not Implemented!");
});

router.post('/addFriend', function(req, res, next) {
    res.send("Not Implemented!");
});

router.delete('/removeFriend', function(req, res, next) {
    res.send("Not Implemented!");
});

router.post('/acceptFriend', function(req, res, next) {
    res.send("Not Implemented!");
});

router.post('/rejectFriend', function(req, res, next) {
    res.send("Not Implemented!");
});

router.get('/viewFriend', function(req, res, next) {
    res.send("Not Implemented!");
});

module.exports = router;
