var firebase = require('firebase');

const db = firebase.default.initializeApp(firebaseConfig);

const travelerRef = db.database().ref("traveler");
const tripRef = db.database().ref("trip");
const destinationRef = db.database().ref("destination");
const itemRef = db.database().ref("item");
const expenseRef = db.database().ref("expense");

module.exports = {travelerRef, tripRef, destinationRef, itemRef, expenseRef};