class Accessor {
    static getObject(ref, id, callback) {
        ref.child(id).once('value', snapshot => {
            callback(snapshot.val());
        });
    }

    static getObjectList(ref, ids, callback) {
        ref.once('value', snapshot => {
            snapshot = snapshot.toJSON();
            var objects = []

            for (const id of ids) {
                objects.push(snapshot[id]);
            }
            
            callback(objects)
        });
    }

    static addObject(ref, json, callback) {
        ref.child(json.id).set(json).then(callback);
    }

    static deleteObject(ref, id, callback) {
        ref.child(id).remove().then(callback);
    }

    static updateObject(ref, json, callback) {
        ref.child(json.id).update(json).then(callback);
    }
}

module.exports = { Accessor };