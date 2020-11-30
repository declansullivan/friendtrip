var express = require('express');
const { Expense } = require('../db/models/expense');
var router = express.Router();

router.post('/getExpense', function(req, res, next) {
    res.send("Not Implemented!");
});

router.post('/getExpenses', function(req, res, next) {
    res.send("Not Implemented!");
});

router.put('/addExpense', function(req, res, next) {
    res.send("Not Implemented!");
});

router.post('/editExpense', function(req, res, next) {
    res.send("Not Implemented!");
});

router.post('/deleteExpense', function(req, res, next) {
    res.send("Not Implemented!");
});

module.exports = router;
