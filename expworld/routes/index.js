var express = require('express');
const mysql = require('mysql');
var bcrypt= require("bcrypt")
var router = express.Router();
var jwt = require('jsonwebtoken');

// HOME
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Crime Database' });
});

//------------------------------- REG - LOG -----------------------------
router.post('/register', function (req, res, next) {
  const password = bcrypt.hash(req.body.password, 5);
  var today = new Date();
  var users={
    "email":req.body.email,
    "password":password,
    "created_at":today,
    "updated_at":today
  }
  req.db.from('users').insert(users)
    .then(res.send({
      "code":200,
      "success":"user registered sucessfully"
    }))
    .catch((err) => {
      console.log(err);
      res.json({ "Error": true, "Message": "Error in MySQL query" })
    })
});

router.post('/login', function (req, res, next) {
  var email= req.body.email;
  var password = req.body.password;
  
  // -----ASSIGNED JWT-----
  var privateKey = fs.readFileSync('email');
  var token = jwt.sign({ id: 'id' }, privateKey, {expiresIn: 24*60*60});

  // -----VERIFY JWT-----
  // verify a token symmetric - synchronous
  var decoded = jwt.verify(token, privateKey);
  console.log(decoded.id) // bar
  // verify a token symmetric
  jwt.verify(token, privateKey, function(err, decoded) {
    console.log(decoded.id) // bar
  });
  // invalid token - synchronous
  try {
    var decoded = jwt.verify(token, 'wrong-secret');
  } catch(err) {
    // err
  }

  req.db.from('users').select("*")
    .then(res.send({
      "code":200,
      "success":"user registered sucessfully"
    }))
    .catch((err) => {
      console.log(err);
      res.json({ "Error": true, "Message": "Error in MySQL query" })
    })
});
//--------------------------------- SEARCH-------------------------------
router.get("/Search", function (req, res, next) {
  let input = "";
  const userInput = "offence=" + input;
  req.db.from('offences').select('*').where(userInput,'=',req.params.userInput)
  .then((rows) => {
  res.json({"Error" : false, "Message" : "Success", "Offences" : rows})
  })
  .catch((err) => {
  console.log(err);
  res.json({"Error" : true, "Message" : "Error executing MySQL query"})
  })
 });
//--------------------------------- HELPERS-------------------------------
// OFFENCES
router.get("/Offences", function (req, res, next) {
  req.db.from('offence_columns').select("pretty")
    .then((rows) => {
      res.json({"Offences": rows.map(row => row.pretty) })
    })
    .catch((err) => {
      console.log(err);
      res.json({ "Error": true, "Message": "Error in MySQL query" })
    })
});
// AREAS
router.get("/Areas", function (req, res, next) {
  req.db.from('areas').select("area")
    .then((rows) => {
      res.json({"Areas": rows.map(row => row.area)})
    })
    .catch((err) => {
      console.log(err);
      res.json({ "Error": true, "Message": "Error in MySQL query" })
    })
});
// AGES
router.get("/Ages", function (req, res, next) {
  req.db.from('offences').select('age').distinct("age")
    .then((rows) => {
      res.json({"Ages": rows.map(row => row.age)})
    })
    .catch((err) => {
      console.log(err);
      res.json({ "Error": true, "Message": "Error in MySQL query" })
    })
});
// GENDERS
router.get("/Genders", function (req, res, next) {
  req.db.from('offences').select("gender").distinct("gender")
    .then((rows) => {
      res.json({"Genders": rows.map(row => row.gender)})
    })
    .catch((err) => {
      console.log(err);
      res.json({ "Error": true, "Message": "Error in MySQL query" })
    })
});
// YEARS
router.get("/Years", function (req, res, next) {
  req.db.from('offences').select("year").distinct("year")
    .then((rows) => {
      res.json({"Years": rows.map(row => row.year)})
    })
    .catch((err) => {
      console.log(err);
      res.json({ "Error": true, "Message": "Error in MySQL query" })
    })
})

module.exports = router;
