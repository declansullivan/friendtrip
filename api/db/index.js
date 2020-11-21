var firebase = require('firebase');
require('dotenv').config();

var firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    databaseURL: process.env.DATABASE_URL,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID
};

const db = firebase.default.initializeApp(firebaseConfig);

const travelerRef = db.database().ref("traveler");
const tripRef = db.database().ref("trip");
const destinationRef = db.database().ref("destination");
const itemRef = db.database().ref("item");
const expenseRef = db.database().ref("expense");

module.exports = {travelerRef, tripRef, destinationRef, itemRef, expenseRef};