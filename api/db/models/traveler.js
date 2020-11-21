const { travelerRef } = require('../index');
const { Accessor } = require('./accessor');

module.exports = class Traveler {
    static getTraveler(id, callback) {
        Accessor.getObject(travelerRef, id, callback);
    }

    static getTravelerList(ids, callback) {
        Accessor.getObjectList(travelerRef, ids, callback);
    }

    static addTraveler(json, callback) {
        Accessor.addObject(travelerRef, json, callback);
    }

    static deleteTraveler(id, callback) {
        Accessor.deleteObject(travelerRef, id, callback);
    }

    static updateTraveler(json, callback) {
        Accessor.updateObject(travelerRef, json, callback);
    }

    static generateTravelerJSON(email, firstName, lastName,
        createdOn, tripIds, friendIds, invitations) {
        return {
            email, firstName, lastName,
            createdOn, tripIds, friendIds, invitations
        };
    }
}