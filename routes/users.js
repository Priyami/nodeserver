var express = require('express');
var router = express.Router();
const { sendEmail } = require("/Users/karvangum/projects/Portfolio/src/mail");
var firebase = require('firebase');
require('dotenv').config({ path: '/Users/karvangum/projects/node-server/.env' });


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
router.get('/', function (req, res, next) {

  res.send("Here i am");
  

});
router.post('/', function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.send(req.body);
  var data = req.body;
  visitors.push(data, function (err) {
    if (err) {
      res.send(err)
    } else {
      res.send("Success:User Save");    
    }
  });
  sendEmail(req.body.email, req.body.comment, "hello");

})



module.exports = router;
