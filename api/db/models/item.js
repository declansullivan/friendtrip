const { itemRef } = require("../index");
const { Accessor } = require("./accessor");

module.exports = class Item {
  static getItem(id, callback) {
    Accessor.getObject(itemRef, id, callback);
  }

  static getItemList(ids, callback) {
    Accessor.getObjectList(itemRef, ids, callback);
  }

  static addItem(json, callback) {
    Accessor.addObject(itemRef, json, callback);
  }

  static deleteItem(id, callback) {
    Accessor.deleteObject(itemRef, id, callback);
  }

  static updateItem(json, callback) {
    Accessor.updateObject(itemRef, json, callback);
  }

  static generateItemJSON(
    id,
    tripId,
    travelerId,
    name,
    assignee,
    description,
    isPublic,
    isComplete
  ) {
    return {
      id,
      tripId,
      travelerId,
      name,
      assignee,
      description,
      isPublic,
      isComplete
    };
  }
};
