var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.send("Trip page.");
//   res.render('trip', { title: 'Express' });
});

module.exports = router;
