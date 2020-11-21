var firebase = require('firebase');

var firebaseConfig = {
    apiKey: "AIzaSyBd0L3cd288Jt8BCOD9pMhxs5OhS5ySBpg",
    authDomain: "friendtrip-c520f.firebaseapp.com",
    databaseURL: "https://friendtrip-c520f.firebaseio.com",
    projectId: "friendtrip-c520f",
    storageBucket: "friendtrip-c520f.appspot.com",
    messagingSenderId: "74829525716",
    appId: "1:74829525716:web:c63e42d8300af6c44a4141"
};

const db = firebase.default.initializeApp(firebaseConfig);

const travelerRef = db.database().ref("traveler");
const tripRef = db.database().ref("trip");
const destinationRef = db.database().ref("destination");
const itemRef = db.database().ref("item");
const expenseRef = db.database().ref("expense");

module.exports = {travelerRef, tripRef, destinationRef, itemRef, expenseRef};