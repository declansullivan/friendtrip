var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.put('/signup', function(req, res, next) {
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
