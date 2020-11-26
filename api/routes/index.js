var express = require('express');
const { Accessor } = require('../db/models/accessor');
const { generateTravelerJSON, addTraveler, getTraveler } = require('../db/models/traveler');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.put('/signup', function (req, res, next) {

  // Callback for Firebase auth.
  handleCreateAccount = (status, code) => {
    const id = req.body.email.replace('.', '');

    if (status === 200) {
      const data = generateTravelerJSON(id, req.body.email, req.body.username, req.body.first,
        req.body.last, Date.now(), [], [], []);
      addTraveler(data, handleCreateTraveler);
    }
    else {
      res.json({ status: 401, code });
    }
  }

  // Callback for Firebase addObject (Traveler).
  handleCreateTraveler = (error) => {
    var status;
    if (error) status = 401;
    else status = 200;
    res.json({ status, code: "none" });
  }

  Accessor.createAccount(req.body.email, req.body.password, handleCreateAccount);
});

router.post('/login', function (req, res, next) {
  // Accessor's loginAccount callback function
  handleLoginAccount = (status, code) => {
    if (status === 200) {
      const id = req.body.email.replace('.', '');
      getTraveler(id, handleGetTraveler);
    }
    else {
      // Return error message
      res.json({ status: 401, code });
    }
  }
  // getTraveler callback function
  handleGetTraveler = (snapshotValue) => {
    res.json({ status: 200, code: "Success", id: snapshotValue.id });
  }
  Accessor.loginAccount(req.body.email, req.body.password, handleLoginAccount);
});

router.post('/logout', function (req, res, next) {
  res.send("Not Implemented!");
});

router.put('/createTrip', function (req, res, next) {

  function randomString(length, chars) {
      var result = '';
      for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
      return result;
  }

  const id = randomString(32, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
  const data = generateTripJSON(id, req.body.travelerId, req.body.name, Date.now(),
  [], [], [], req.body.description, [], []);

  // // Callback for Firebase auth.
  // handleCreateTrip = (status, code) => {
  //   const id = randomString(32, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');

  //   if (status === 200) {
  //     const data = generateTripJSON(id, req.body.travelerId, req.body.name, Date.now(),
  //                                     [], [], [], req.body.description, [], []);
  //     // addTrip(data, handleAddTrip);
  //   }
  //   else {
  //     res.json({ status: 401, code });
  //   }
  // }

  // Callback for Firebase addObject (Traveler).
  handleAddTrip = (error) => {
    var status;
    if (error) status = 401;
    else status = 200;
    res.json({ status, code: "none" });
  }

  Trip.addTrip(data, handleAddTrip);
});

/*
        return  { id, travelerId, name, lastUpdate, travelerIds, destinationIds,
                  itemIds, expenseIds, description, itinerary, tripLeaders };
*/
module.exports = router;
