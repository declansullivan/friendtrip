const { tripRef } = require('../index');
const { Accessor } = require('./accessor');

module.exports = class Trip {
    static getTrip(id, callback) {
        Accessor.getObject(tripRef, id, callback);
    }

    static getTripList(ids, callback) {
        Accessor.getObjectList(tripRef, ids, callback);
    }

    static addTrip(json, callback) {
        Accessor.addObject(tripRef, json, callback);
    }

    static deleteTrip(id, callback) {
        Accessor.deleteObject(tripRef, id, callback);
    }

    static updateTrip(json, callback) {
        Accessor.updateObject(tripRef, json, callback);
    }

    static generateTripJSON(id, travelerId, name, lastUpdate, travelerIds,
                            destinationIds, itemIds, expenseIds, description,
                            itinerary, tripLeaders) {
        return  { id, travelerId, name, lastUpdate, travelerIds, destinationIds,
                  itemIds, expenseIds, description, itinerary, tripLeaders };
    }
}