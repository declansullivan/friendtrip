var express = require('express');
const { getTraveler, getTravelerList, updateTraveler } = require('../db/models/traveler');
const { getTripList, getTrip, updateTrip } = require('../db/models/trip');
var router = express.Router();

router.post('/getTrip', function(req, res, next) {
    handleGetTrip = (trip) => {
        res.json({ trip });
    }

    getTrip(req.body.tripId, handleGetTrip);
});

router.post('/getTrips', function(req, res, next) {
    handleGetTrips = (trips) => {
        res.json({ trips });
    }

    getTripList(req.body.tripIds, handleGetTrips);
});

router.post('/getTravelers', function(req, res, next) {
    handleGetTravelers = (travelers) => {
        res.json({ travelers });
    }

    getTravelerList(req.body.travelerIds, handleGetTravelers);
});

router.put('/addTraveler', function(req, res, next) {
    handleGetTraveler = (traveler) => {
        if (!traveler.tripIds) traveler.tripIds = [];
        traveler.tripIds.push(req.body.tripId);

        updateTraveler(traveler, handleUpdateTraveler);
    }

    handleUpdateTraveler = (error) => {
        if (error) res.sendStatus(401);
        else res.sendStatus(200);
    }

    getTraveler(req.body.travelerId, handleGetTraveler);
});

router.post('/updateItinerary', function(req, res, next) {
    handleUpdateItinerary = (error) => {
        if (error) res.sendStatus(401);
        else res.sendStatus(200);
    }
    
    updateTrip(req.body, handleUpdateItinerary);
});

router.post('/sendInvite', function(req, res, next) {
    handleGetTraveler = (traveler) => {
        if (!traveler.invitations) traveler.invitations = [];
        traveler.invitations.push(req.body.tripId);

        updateTraveler(traveler, handleUpdateTraveler);
    }

    handleUpdateTraveler = (error) => {
        if (error) res.sendStatus(401);
        else res.sendStatus(200);
    }

    getTraveler(req.body.id, handleGetTraveler);
});

router.put('/addTripLeader', function(req, res, next) {
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
