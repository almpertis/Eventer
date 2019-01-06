import firebase from 'firebase/app';
import 'firebase/firebase-firestore';
import 'firebase/auth';

// Initialize Firebase
var config = {
    apiKey: "AIzaSyB2usDtLeHNJmOSZmOZ_yrJddBMF8PNgg0",
    authDomain: "eventer-12e8a.firebaseapp.com",
    databaseURL: "https://eventer-12e8a.firebaseio.com",
    projectId: "eventer-12e8a",
    storageBucket: "eventer-12e8a.appspot.com",
    messagingSenderId: "1001410142783"
};

firebase.initializeApp(config);
firebase.firestore().settings({ timestampsInSnapshots: true });

export default firebase;