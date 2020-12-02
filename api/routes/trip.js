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
const {deleteItem, getItemList, updateItem} = require("../db/models/item");
const {getExpenseList, deleteExpense} = require("../db/models/expense");
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

router.put("/addTraveler", function (req, res, next) {
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

router.post("/sendInvite", function (req, res, next) {
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
  };

  handleUpdateTraveler = (error) => {
    if (error) res.sendStatus(401);
    else res.sendStatus(200);
  };

  getTraveler(req.body.id, handleGetTraveler);
});

router.post("/addTripLeader", function (req, res, next) {
  handleUpdateTrip = (error) => {
    if (error) res.sendStatus(401);
    else res.sendStatus(200);
  }

  updateTrip(req.body, handleUpdateTrip);
});

router.delete("/deleteTrip", function (req, res, next) {
  handleGetTraveler = (travelerList) => {
    let travelerListLength = Object.keys(travelerList).length;
    for (let i = 0; i < travelerListLength; i++) {
      let trips;
      let tripsLength;
      // Delete the Trip id from every Traveler on the Trip
      if (travelerList[i].tripIds) {
        trips = travelerList[i].tripIds;
        tripsLength = Object.keys(trips).length;
        // For each trip they are on, look for the trip to delete and delete it
        var newTrips = [];
        for (let j = 0; j < tripsLength; j++) {
          if (req.body.tripId !== trips[j]) {
            newTrips.push(trips[j]);
          }
        }
        // Copy the trips array with the trip deleted to the traveler
        travelerList[i].tripIds = newTrips;
        updateTraveler(travelerList[i], handleUpdateTraveler);
      }
      // Delete the Item objects associated with the Trip
      getItemList(req.body.itemIds, handleGetItems);
      // Delete the Expense Objects associated with the Trip
      getExpenseList(req.body.expenseIds, handleGetExpenses)
    }
    deleteTrip(req.body.tripId, handleDeleteTrip);
  };
  handleGetItems = (items) => {
    let itemsListLength = Object.keys(items).length;
    for (let k = 0; k < itemsListLength; k++) {
      deleteItem(items[k].id, handleDeleteItem);
    }
  }
  handleDeleteItem = (error) => {};
  handleGetExpenses = (expenses) => {
    let expensesListLength = Object.keys(expenses).length;
    for(let m = 0; m < expensesListLength; m++) {
      deleteExpense(expenses[m].id, handleDeleteExpense);
    }
  }
  handleDeleteExpense = (error) => {};
  handleUpdateTraveler = (error) => {};
  handleDeleteTrip = (error) => {
    if (error) res.sendStatus(401);
    else res.sendStatus(200);
  };
  // Get the travelers
  getTravelerList(req.body.travelerIds, handleGetTraveler);
});

router.post("/leaveTrip", function (req, res, next) {
  // For a Traveler Object, remove the trip from their tripIds
  handleGetTraveler = (traveler) => {
    let trips;
    let tripsLength;
    if (traveler.tripIds) {
      trips = traveler.tripIds;
      tripsLength = Object.keys(trips).length;
      let newTrips = [];
      for (let i = 0; i < tripsLength; i++) {
        if (trips[i] !== req.body.tripId) newTrips.push(trips[i]);
      }
      traveler.tripIds = newTrips;
      updateTraveler(traveler, handleUpdateTraveler);
    }
  };
  handleUpdateTraveler = (error) => {};
  getTraveler(req.body.travelerId, handleGetTraveler);

  // For a Trip Object, remove the traveler from travelerIds and from tripLeaders (if trip leader)
  handleGetTrip = (trip) => {
    // Handle removing traveler from Trip Object's travelerIds
    let travelerIds;
    let travelerIdsLength;
    let newTravelerIds = [];
    if (trip.travelerIds) {
      travelerIds = trip.travelerIds;
      travelerIdsLength = Object.keys(travelerIds).length;
      for (let j = 0; j < travelerIdsLength; j++) {
        if (req.body.travelerId !== travelerIds[j])
          newTravelerIds.push(travelerIds[j]);
      }
      trip.travelerIds = newTravelerIds;
    }
    // Handle removing Trip Leader from Trip Object's trip leaders
    let tripLeaders;
    let tripLeadersLength;
    let newTripLeaders = [];
    if (req.body.isTripLeader && trip.tripLeaders) {
      tripLeaders = trip.tripLeaders;
      tripLeadersLength = Object.keys(tripLeaders).length;
      for (let k = 0; k < tripLeadersLength; k++) {
        if (req.body.travelerId !== tripLeaders[k])
          newTripLeaders.push(tripLeaders[k]);
      }
      trip.tripLeaders = newTripLeaders;
    }
    // Handle updating the Item Objects in the abscence of the Traveler
    if(trip.itemIds) getItemList(trip.itemIds, handleGetItems);

    // Handle updating the Expense in the abscence of the Traveler
    // Update the Trip Object
    updateTrip(trip, handleUpdateTrip);
  };
  // For each item in the Trip, if the person leaving is assigned to it, blank out the assignee
  handleGetItems = (items) => {
    if(items) {
      let itemsListLength = Object.keys(items).length;
      for(let l = 0; l < itemsListLength; l++) {
        if(items[l].assignee === req.body.travelerId) {
          let newItem = items[l];
          newItem.assignee = null;
          updateItem(newItem, handleUpdateItem);
        }
      }
    }
  };
  handleUpdateItem = (error) => {};
  handleUpdateTrip = (error) => {
    if (error) res.sendStatus(401);
    else res.sendStatus(200);
  };
  getTrip(req.body.tripId, handleGetTrip);
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
    if (traveler.invitations) {
      for (const invite of traveler.invitations) {
        if (invite !== req.body.tripId) invitations.push(invite);
      }
    }

    // Add Trip
    var tripIds = [];
    if (traveler.tripIds) tripIds = traveler.tripIds;
    tripIds.push(req.body.tripId);

    // Callback
    const data = { id: req.body.travelerId, invitations, tripIds };
    updateTraveler(data, handleUpdateTraveler);
  };

  handleUpdateTraveler = (error) => {};

  handleGetTrip = (trip) => {
    // Add Traveler
    var travelerIds = trip.travelerIds;
    travelerIds.push(req.body.travelerId);

    // Callback
    const data = { id: req.body.tripId, travelerIds };
    updateTrip(data, handleUpdateTrip);
  };

  handleUpdateTrip = (error) => {
    if (error) res.sendStatus(401);
    else res.sendStatus(200);
  };

  // Add Trip to Traveler, add Traveler to Trip
  getTraveler(req.body.travelerId, handleGetTraveler);
  getTrip(req.body.tripId, handleGetTrip);
});

router.post("/rejectInvite", function (req, res, next) {
  handleGetTraveler = (traveler) => {
    var invitations = [];
    if (traveler.invitations) {
      for (const invite of traveler.invitations) {
        if (invite !== req.body.tripId) invitations.push(invite);
      }
    }

    const data = { id: req.body.travelerId, invitations };
    updateTraveler(data, handleUpdateTraveler);
  };

  handleUpdateTraveler = (error) => {
    if (error) res.sendStatus(401);
    else res.sendStatus(200);
  };

  getTraveler(req.body.travelerId, handleGetTraveler);
});

module.exports = router;
