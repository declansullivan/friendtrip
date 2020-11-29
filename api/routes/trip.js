var express = require("express");
const {
  getTraveler,
  getTravelerList,
  updateTraveler,
} = require("../db/models/traveler");
const {
  getTripList,
  getTrip,
  updateTrip,
  deleteTrip,
} = require("../db/models/trip");
var router = express.Router();

router.get("/", function (req, res, next) {
  res.send("Trip page.");
});

router.post("/getTrip", function (req, res, next) {
  handleGetTrip = (trip) => {
    res.json({ trip });
  };

  getTrip(req.body.tripId, handleGetTrip);
});

router.post("/getTrips", function (req, res, next) {
  handleGetTrips = (trips) => {
    res.json({ trips });
  };

  getTripList(req.body.tripIds, handleGetTrips);
});

router.post("/getTravelers", function (req, res, next) {
  handleGetTravelers = (travelers) => {
    res.json({ travelers });
  };

  getTravelerList(req.body.travelerIds, handleGetTravelers);
});

router.put('/addTraveler', function(req, res, next) {
    handleGetTraveler = (traveler) => {
        if (!traveler.tripIds) traveler.tripIds = [];
        traveler.tripIds.push(req.body.tripId);

    updateTraveler(traveler, handleUpdateTraveler);
  };

  handleUpdateTraveler = (error) => {
    if (error) res.sendStatus(401);
    else res.sendStatus(200);
  };

  getTraveler(req.body.travelerId, handleGetTraveler);
});

router.post("/updateItinerary", function (req, res, next) {
  handleUpdateItinerary = (error) => {
    if (error) res.sendStatus(401);
    else res.sendStatus(200);
  };

  updateTrip(req.body, handleUpdateItinerary);
});

router.post('/sendInvite', function(req, res, next) {
    handleGetTraveler = (traveler) => {
        if (!traveler.invitations) traveler.invitations = [];
        
        // Don't give a Traveler multiple of the same invite.
        for (const invite of traveler.invitations) {
          if (invite === req.body.tripId) {
            res.sendStatus(202);
            return;
          }
        }

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

router.delete("/deleteTraveler", function (req, res, next) {
  res.send("Not Implemented!");
});

router.delete("/deleteTrip", function (req, res, next) {
  handleGetTraveler = (travelerList) => {
    let travelerListLength = Object.keys(travelerList).length;
    for (let i = 0; i < travelerListLength; i++) {
      let trips;
      let tripsLength;
      // Go through the traveler list, and look at what trips they are on
      if (travelerList[i].tripIds) {
        trips = travelerList[i].tripIds;
        tripsLength = Object.keys(trips).length;
        // For each trip they are on, look for the trip to delete and delete it
        var newTrips = []
        for (let j = 0; j < tripsLength; j++) {
          if (req.body.tripId !== trips[j]) {
            newTrips.push(trips[j]);
          }
        }
        // Copy the trips array with the trip deleted to the traveler
        travelerList[i].tripIds = newTrips;
        updateTraveler(travelerList[i], handleUpdateTraveler);
      }
    }
    deleteTrip(req.body.tripId, handleDeleteTrip);
  };

  handleUpdateTraveler = (error) => {};

  handleDeleteTrip = (error) => {
    if (error) res.sendStatus(401);
    else res.sendStatus(200);
  };
  // Get the travelers
  getTravelerList(req.body.travelerIds, handleGetTraveler);
});

router.post("/leaveTrip", function (req, res, next) {
  res.send("Not Implemented!");
});

router.get("/exportTrip", function (req, res, next) {
  res.send("Not Implemented!");
});

router.post("/alertTraveler", function (req, res, next) {
  res.send("Not Implemented!");
});

router.post("/acceptInvite", function (req, res, next) {
  // Get Traveler
  handleGetTraveler = (traveler) => {
    // Remove invitation
    var invitations = [];
    if (traveler.invitations) invitations = traveler.invitations;
    for (const invite of invitations) {
      if (invite !== req.body.tripId) invitations.push(invite);
    }

    // Add Trip
    var tripIds = [];
    if (traveler.tripIds) tripIds = traveler.tripIds;
    tripIds.push(req.body.tripId);

    // Callback
    const data = { id: req.body.travelerId, invitations, tripIds };
    updateTraveler(data, handleUpdateTraveler);
  }

  handleUpdateTraveler = (error) => {}

  handleGetTrip = (trip) => {
    // Add Traveler
    var travelerIds = trip.travelerIds;
    travelerIds.push(req.body.travelerId);

    // Callback
    const data = { id: req.body.tripId, travelerIds }
    updateTrip(data, handleUpdateTrip);
  }

  handleUpdateTrip = (error) => {
    if (error) res.sendStatus(401);
    else res.sendStatus(200);
  }
  
  // Add Trip to Traveler, add Traveler to Trip
  getTraveler(req.body.travelerId, handleGetTraveler);
  getTrip(req.body.tripId, handleGetTrip);
});

router.post("/rejectInvite", function (req, res, next) {
  handleGetTraveler = (traveler) => {
    var invitations = [];
    if (traveler.invitations) invitations = traveler.invitations;
    for (const invite of invitations) {
      if (invite !== req.body.tripId) invitations.push(invite);
    }
    const data = { id: req.body.travelerId, invitations };
    updateTraveler(data, handleUpdateTraveler);
  }

  handleUpdateTraveler = (error) => {
    if (error) res.sendStatus(401);
    else res.sendStatus(200);
  }
  
  getTraveler(req.body.travelerId, handleGetTraveler);
});

module.exports = router;
