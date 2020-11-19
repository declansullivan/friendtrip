var express = require('express');
const { Traveler } = require('../db/models/traveler');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.put('/signup', function(req, res, next) {
  // Example
  // Create firebase user, then create Traveler object for that user
  TravelerDB.addTraveler();
  res.send("Not Implemented!");
});

router.post('/login', function(req, res, next) {
  res.send("Not Implemented!");
});

router.post('/logout', function(req, res, next) {
  res.send("Not Implemented!");
});

router.put('/createTrip', function(req, res, next) {
  res.send("Not Implemented!");
});


module.exports = router;
