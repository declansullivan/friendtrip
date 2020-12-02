var express = require('express');
const { getDestination, getDestinationList, addDestination,
    deleteDestination, updateDestination, generateDestinationJSON } = require('../db/models/destination');
const { getTrip, addTrip, updateTrip } = require("../db/models/trip");
var router = express.Router();

router.post('/getDestination', function (req, res, next) {
    res.send("Not Implemented!");
});

router.post('/getDestinations', function (req, res, next) {
    res.send("Not Implemented!");
});

router.put('/addDestination', function (req, res, next) {
    // Generates random ID
    function generateId(length, chars) {
        var result = "";
        for (var i = length; i > 0; --i)
            result += chars[Math.floor(Math.random() * chars.length)];
        return result;
    }
    // Generate destination ID
    const id = "destination_".concat(
        generateId(
            16,
            "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
        )
    );
    const data = generateDestinationJSON(
        id,
        req.body.tripId,
        req.body.travelerId,
        req.body.destName,
        req.body.destCountryCode,
        req.body.destStartDate,
        req.body.destEndDate,
        req.body.destDescription,
        req.body.destAddress,
    );
    // Add Destination Object
    handleAddDestination = (error) => { }
    addDestination(data, handleAddDestination);

    handleUpdateTrip = (error) => {
        if (error) res.sendStatus(401);
        else res.sendStatus(200);
    };
    handleGetTrip = (trip) => {
        if (trip) {
            let newDestinationIds = [];
            if (trip.destinationIds) newItemIds = trip.destinationIds;
            newDestinationIds.push(id);
            trip.destinationIds = newDestinationIds;
            updateTrip(trip, handleUpdateTrip);
        }
    }
    getTrip(req.body.tripId, handleGetTrip);
});

router.post('/editDestination', function (req, res, next) {
    res.send("Not Implemented!");
});

router.delete('/deleteDestination', function (req, res, next) {
    res.send("Not Implemented!");
});

module.exports = router;
