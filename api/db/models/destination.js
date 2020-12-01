const { destinationRef } = require('../index');
const { Accessor } = require('./accessor');


module.exports = class Destination {
    static getDestination(id, callback) {
        Accessor.getObject(destinationRef, id, callback);
    }

    static getDestinationList(ids, callback) {
        Accessor.getObjectList(destinationRef, ids, callback);
    }

    static addDestination(json, callback) {
        Accessor.addObject(destinationRef, json, callback);
    }

    static deleteDestination(id, callback) {
        Accessor.deleteObject(destinationRef, id, callback);
    }

    static updateDestination(json, callback) {
        Accessor.updateObject(destinationRef, json, callback);
    }

    static generateDestinationJSON(id, tripId, travelerId, name, countryCode,
                                   startDate, endDate, description, address) {
        return { id, tripId, travelerId, name, countryCode, 
                 startDate, endDate, description, address };
    }
}