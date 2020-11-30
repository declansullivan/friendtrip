var express = require('express');
const { getTraveler, updateTraveler, getTravelerList } = require('../db/models/traveler');
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

router.post('/getFriends', function(req, res, next) {
    handleGetTraveler = (traveler) => {
        getTravelerList(traveler.friendIds, handleGetFriends);
    }

    handleGetFriends = (friends) => {
        res.json({ status: 200, friends });
    }

    getTraveler(req.body.id, handleGetTraveler);
});

router.post('/addFriend', function(req, res, next) {
    handleValidTraveler = (traveler) => {
        // Traveler invited must exist
        if (!traveler) {
            res.sendStatus(404);
            return;
        }

        getTraveler(req.body.id, handleGetTraveler);
    }

    handleGetTraveler = (traveler) => {
        if (!traveler.friendIds) traveler.friendIds = [];

        // No duplicate friends.
        for (const friend of traveler.friendIds) {
            if (friend === req.body.friendId) {
                res.sendStatus(202);
                return;
            }
        }

        traveler.friendIds.push(req.body.friendId);
        updateTraveler(traveler, handleUpdateTraveler);
    }

    handleUpdateTraveler = (error) => {
        if (error) res.sendStatus(401);
        else res.sendStatus(200);
    }

    // No self friend requests.
    if (req.body.id === req.body.friendId) {
        res.sendStatus(403);
        return;
    }

    getTraveler(req.body.friendId, handleValidTraveler);
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
