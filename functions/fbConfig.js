const firebase = require('firebase');

  // Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCAHyHkB6_Cm5hFj9jc_ebQbvF8Bkjl-xs",
    authDomain: "graphql-sample-f4eef.firebaseapp.com",
    databaseURL: "https://graphql-sample-f4eef.firebaseio.com",
    projectId: "graphql-sample-f4eef",
    storageBucket: "graphql-sample-f4eef.appspot.com",
    messagingSenderId: "589374426617",
    appId: "1:589374426617:web:f630258cfec44c747a4128",
    measurementId: "G-XHBVT3FM46"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
module.exports = firebase;