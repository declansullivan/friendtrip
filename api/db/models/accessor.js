const db = require("..");

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

            if (!ids) {
                callback(objects);
                return;
            }

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

    static createAccount(email, password, callback) {
        db.db.auth().createUserWithEmailAndPassword(email, password)
            .then((user) => {
                // Signed in
                callback(200, null);
            }).catch((error) => {
                // Error
                callback(401, error.code);
            });
    }
    static loginAccount(email, password, callback) {
        db.db.auth().signInWithEmailAndPassword(email, password)
            .then((user) => {
                //Signed in
                callback(200, null);
            }).catch((error) => {
                //Error
                callback(401, error.code);
            });
    }
    static logout(callback){
        db.db.auth().signOut()
            .then(() => {
                callback(200, null);
            }).catch((error) => {
                callback(401, error.code);
            });
    }
}

module.exports = { Accessor };