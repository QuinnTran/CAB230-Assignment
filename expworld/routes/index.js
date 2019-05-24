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
      "success":"user registered sucessfully",
      "password":password
    }))
    .catch((err) => {
      console.log(err);
      res.json({ "Error": true, "Message": "Error in MySQL query" })
    })
});

router.post('/login', function (req, res, next) {
  var email= req.body.email;
  var password = req.body.password;
  req.db.from('users').select("password")
  .then(row => row[0].password)
  .then(dbPass =>{
    if(bcrypt.compareSync(password, dbPass)){
      var expire = Math.floor(Date.now() / 1000) + (60 * 60);
      // -----ASSIGNED JWT-----
      var token = jwt.sign({ user: 'email' }, 'shhhhh');
      res.send({
        success: true,
        message: 'Authentication successful!',
        token: token,
        expires_in: expire
      });
    }else{
      res.send(401,"PASSWORD INCORRECT");
    }
  })
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
