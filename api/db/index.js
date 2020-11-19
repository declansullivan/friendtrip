import firebase from 'firebase';



const db = firebase.initializeApp(firebaseConfig);

export const travelerRef = db.database().ref("traveler");
export const tripRef = db.database().ref("trip");
export const destinationRef = db.database().ref("destination");
export const itemRef = db.database().ref("item");
export const expenseRef = db.database().ref("expense");