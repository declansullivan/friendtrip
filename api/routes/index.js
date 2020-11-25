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
    res.json({ status, code: "Success" });
  }
  Accessor.loginAccount(req.body.email, req.body.password, handleLoginAccount);
});

router.post('/logout', function (req, res, next) {
  res.send("Not Implemented!");
});

router.put('/createTrip', function (req, res, next) {
  res.send("Not Implemented!");
});


module.exports = router;
