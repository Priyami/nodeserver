var express = require('express');
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
router.get('/',  (req, res, next) =>{
    try {
        visitors.on("value", function(snapshot){
         let visits = [];
         snapshot.forEach(visit => {
           const {firstname, lastname, email, comment} = visit.val();
           const serverkey = visit.key;
           visits.push({firstname,lastname,email, comment, serverkey});
         })

          return res.status(200).send(visits);
        })

    }
    catch(error){
      console.log(error);
      return res.status(500).send(error);
    }
  })

router.post('/', function (request, response) {
  var data = request.body;

  //Send Email.
  sendEmail(request.body.email, request.body.comment, "hello");


  //Push Data to DB
  visitors.push(data, function (err) {
    if (err) {
      console.log(err);

    } else {

      response.send(data);
    }
  });

})

router.delete("/clearall", function (request,response) {
  firebase.database().ref("visitors").remove()
    .then(function() {
      console.log("Remove succeeded.")
    })
    .catch(function(error) {
      console.log("Remove failed: " + error.message)
      return response.status(500).send(error.message);
    });
    return response.status(200);

})



module.exports = router;
