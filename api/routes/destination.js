var express = require('express');
const { getDestination, getDestinationList, addDestination,
    deleteDestination, updateDestination, generateDestinationJSON } = require('../db/models/destination');
var router = express.Router();

router.post('/getDestination', function (req, res, next) {
    res.send("Not Implemented!");
});

router.post('/getDestinations', function (req, res, next) {
    res.send("Not Implemented!");
});

router.put('/addDestination', function (req, res, next) {
    console.log("hello");
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
        req.body.name,
        req.body.countryCode,
        req.body.startDate,
        req.body.destEndDate,
        req.body.description,
        req.body.destAddress,
    );



    handleAddDestination = (error) => { }
    console.log("hello");
    addDestination(data, handleAddDestination);

    handleUpdateTrip = (error) => {
        if (error) res.sendStatus(401);
        else res.sendStatus(200);
    };
    handleGetTrip = (trip) => {
        if (trip) {
            let newItemIds = [];
            if (trip.itemIds) newItemIds = trip.itemIds;
            newItemIds.push(id);
            trip.itemIds = newItemIds;
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
