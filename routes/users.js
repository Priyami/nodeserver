var express = require('express');
const path = require('path');
var router = express.Router();
const { sendEmail } = require("./mail");

var firebase = require('firebase');
require('dotenv').config({ path: './.env' });


// Initialize Firebase
let config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
}

firebase.initializeApp(config);
  let db = firebase.database();

  var visitors = db.ref("visitors");

/* GET users listing. */
router.get('/getallusers', (req, res, next) => {
  try {
    visitors.once("value", function (snapshot) {
      let visits = [];
      snapshot.forEach(visit => {
        const { firstname, lastname, email, comment } = visit.val();
        const serverkey = visit.key;
        visits.push({ firstname, lastname, email, comment, serverkey });
      })

      return res.status(200).send(visits);
    })

  }
  catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
})



router.post('/send', function (request, response) {
  let data = request.body;
  console.log(data);
  //Push Data to DB
  
  visitors.push(data, function (err) {
    if (err) {
      console.log("Error on pushing users data to db ", err);
      return response.send("Sorry , please try again")
    } else {
      console.log("Sending welcome email to " + data.email);
      sendEmail(data.email, data.comment, "hello");
      sendEmail(data.email, data.comment, "thanks");
      return response.send("Email Sent successfully to  " + data.email);
    }

  });
  
})

module.exports = router;
