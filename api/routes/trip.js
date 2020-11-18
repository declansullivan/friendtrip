var express = require('express');
const { TripDB } = require('../db/models/trip');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.send("Trip page.");
//   res.render('trip', { title: 'Express' });
});

router.put('/addTraveler', function(req, res, next) {
    res.send("Not Implemented!");
});

router.put('/addTripLeader', function(req, res, next) {
    res.send("Not Implemented!");
});

router.get('/viewTravelers', function(req, res, next) {
    res.send("Not Implemented!");
});

router.delete('/deleteTraveler', function(req, res, next) {
    res.send("Not Implemented!");
});

router.delete('/deleteTrip', function(req, res, next) {
    res.send("Not Implemented!");
});

router.post('/leaveTrip', function(req, res, next) {
    res.send("Not Implemented!");
});

router.get('/exportTrip', function(req, res, next) {
    res.send("Not Implemented!");
});

router.post('/alertTraveler', function(req, res, next) {
    res.send("Not Implemented!");
});

router.post('/acceptInvite', function(req, res, next) {
    res.send("Not Implemented!");
});

router.post('/rejectInvite', function(req, res, next) {
    res.send("Not Implemented!");
});

module.exports = router;
