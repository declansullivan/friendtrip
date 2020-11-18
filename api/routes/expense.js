var express = require('express');
const { ExpenseDB } = require('../db/models/expense');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.send("Expense API.");
});

router.put('/addExpense', function(req, res, next) {
    res.send("Not Implemented!");
});

router.get('/viewExpense', function(req, res, next) {
    res.send("Not Implemented!");
});

router.post('/editExpense', function(req, res, next) {
    res.send("Not Implemented!");
});

module.exports = router;
