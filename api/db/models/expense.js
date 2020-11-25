const { expenseRef } = require('../index');
const { Accessor } = require('./accessor');

module.exports = class Expense {
    static getExpense(id, callback) {
        Accessor.getObject(expenseRef, id, callback);
    }

    static getExpenseList(ids, callback) {
        Accessor.getObjectList(expenseRef, ids, callback);
    }

    static addExpense(json, callback) {
        Accessor.addObject(expenseRef, json, callback);
    }

    static deleteExpense(id, callback) {
        Accessor.deleteObject(expenseRef, id, callback);
    }

    static updateExpense(json, callback) {
        Accessor.updateObject(expenseRef, json, callback);
    }

    static generateExpenseJSON(id, tripId, travelerId, name,
        description, cost, travelerIds) {
        return {
            id,
            tripId,
            travelerId,
            name,
            description,
            cost,
            travelerIds
        };
    }
}