var express = require('express');
const { getTraveler } = require('../db/models/traveler');
var router = express.Router();

router.post('/getAccount', function(req, res, next) {
    handleGetAccount = (account) => {
        res.json(account);
    }

    getTraveler(req.body.id, handleGetAccount);
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
