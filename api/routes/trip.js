var express = require('express');
const { getTraveler, updateTraveler } = require('../db/models/traveler');
const { getTripList } = require('../db/models/trip');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.send("Trip page.");
});

router.post('/getTrip', function(req, res, next) {

});

router.post('/getTrips', function(req, res, next) {
    handleGetTrips = (trips) => {
        res.json({ trips });
    }

    getTripList(req.body.tripIds, handleGetTrips);
});

router.put('/addTraveler', function(req, res, next) {
    handleGetTraveler = (traveler) => {
        var trips;
        if (!traveler.tripIds) trips = [];
        else trips = traveler.tripIds;

        trips.push(req.body.tripId);
        traveler.tripIds = trips;

        updateTraveler(traveler, handleUpdateTraveler);
    }

    handleUpdateTraveler = (error) => {
        if (error) res.sendStatus(401);
        else res.sendStatus(200);
    }

    getTraveler(req.body.travelerId, handleGetTraveler);
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
