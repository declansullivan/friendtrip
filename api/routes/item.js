var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.send("Item API.");
});

module.exports = router;
