import * as functions from 'firebase-functions';

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

exports.helloWorld = functions.https.onCall((data, context) => {
    return {
        body: 'Functions works! 🚀'
    }
});