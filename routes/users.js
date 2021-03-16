var express = require('express');
var router = express.Router();
const {sendEmail} = require("/Users/karvangum/projects/Portfolio/src/mail");

/* GET users listing. */
router.get('/', function(req, res, next) {
 
  res.send("Here i am");
  
});
router.post('/', function(req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.send(req.body);
  sendEmail(req.body.email, req.body.comment, "hello");
})
module.exports = router;
