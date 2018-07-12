const functions = require('firebase-functions');

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.myRequest = functions.https.onRequest((request, response) => {
 response.send("For upload img on Firebase!");
});
