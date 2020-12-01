var express = require("express");
const {
  Expense,
  generateExpenseJSON,
  updateExpense,
  addExpense,
  getExpenseList,
} = require("../db/models/expense");
const { updateTrip, getTrip } = require("../db/models/trip");
var router = express.Router();

router.post("/getExpense", function (req, res, next) {
  res.send("Not Implemented!");
});

router.post("/getExpenses", function (req, res, next) {
  handleGetExpenses = (expenses) => {
    res.json({ expenses });
  };
  getExpenseList(req.body.expenseIds, handleGetExpenses);
});

router.put("/addExpense", function (req, res, next) {
  // Generates random ID
  function generateId(length, chars) {
    var result = "";
    for (var i = length; i > 0; --i)
      result += chars[Math.floor(Math.random() * chars.length)];
    return result;
  }
  // Generate item ID
  const id = "expense_".concat(
    generateId(
      16,
      "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    )
  );
  const data = generateExpenseJSON(
    id,
    req.body.tripId,
    req.body.travelerId,
    req.body.expenseName,
    req.body.description,
    req.body.cost,
    req.body.assignedTravelers
  );
  // Add expense to database
  handleAddExpense = error = {};
  addExpense(data, handleAddExpense);
  // Add expense to Trip Object
  handleUpdateTrip = (error) => {
    if (error) res.sendStatus(401);
    else res.sendStatus(200);
  };
  handleGetTrip = (trip) => {
    if (trip) {
      let newExpenseIds = [];
      if (trip.expenseIds) newExpenseIds = trip.expenseIds;
      newExpenseIds.push(id);
      trip.expenseIds = newExpenseIds;
      updateTrip(trip, handleUpdateTrip);
    }
  };
  getTrip(req.body.tripId, handleGetTrip);
});

router.post("/editExpense", function (req, res, next) {
  res.send("Not Implemented!");
});

router.post("/deleteExpense", function (req, res, next) {
  res.send("Not Implemented!");
});

module.exports = router;
