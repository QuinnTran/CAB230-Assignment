var express = require('express');
const mysql = require('mysql');
var bcrypt = require("bcrypt")
var router = express.Router();
var jwt = require('jsonwebtoken');

// HOME
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Crime Database' });
});

//------------------------------- REG - LOG -----------------------------
router.post('/register', function (req, res, next) {
  const password = bcrypt.hashSync(req.body.password, 5);
  var today = new Date();
  var users = {
    "email": req.body.email,
    "password": password,
    "created_at": today,
    "updated_at": today
  }

  req.db.from('users').insert(users)
    .then(res.send({
      "code": 200,
      "success": "user registered sucessfully",
      "password": password
    }))
    .catch((err) => {
      console.log(err);
      res.json({ "Error": true, "Message": "Error in MySQL query" })
    })
});

router.post('/login', function (req, res, next) {
  var email = req.body.email;
  var password = req.body.password;
  req.db.from('users').select("password").where({ email: email })
    .then(row => row[0].password)
    .then(passDB => {
      if (bcrypt.compareSync(password, passDB)) {
        var expire = Math.floor(Date.now() / 1000) + (60 * 60);
        // -----ASSIGNED JWT-----
        var token = jwt.sign({ user: email, exp: expire, time: Date.now() }, 'shhhhh');
        res.send({
          access_token: token,
          "Token type": "Bearer",
          expires_in: expire
        });
      } else {
        res.send(401, "PASSWORD INCORRECT");
      }
    })
    .catch((err) => {
      console.log(err);
      res.json({ "Error": true, "Message": "Error in MySQL query" })
    })
});
//--------------------------------- SEARCH-------------------------------
router.get("/search?:query", function (req, res, next) {
  const query = decodeURI(req.url).split("?")[1];
  var filter = query.split("&"); //split filter using & (ex: search?offence=arson&area=winton)
  var numFilters = 0;
  var data = [];

  //loop through every filters 
  for (i of filter) {
    ++numFilters;
  }

  var values = [];
  var filterArray = [];
  var varArray = [];
  //push data into array
  for (var i = 0; i < numFilters; i++) {
    values.push([]);
    filterArray.push([]);
    varArray.push([]);
  }

  for (var i = 0; i < numFilters; i++) {
    var filterQuery = filter[i];
    varArray[i] = filterQuery.split('=');
    filterArray[i] = varArray[i][0];
    values[i] = varArray[i][1].split(',');
  }

  if (numFilters == 1) {
    req.db
      .from('offences')
      .select('area', 'age', 'gender', 'year', 'month')
      .orderBy('year', 'asc')
      .then((rows) => {
        for (row of rows) {
          data.push(`[${row['area']},${row['age']},${row['gender']},${row['year']},${row['month']}]`);
        }
        res.json({
          data
        })
      })
      .catch((err) => {
        console.log(err);
        res.json({ "Error": true, "Message": "Error executing MySQL query" })
      })
  } else if (numFilters == 2) {
    req.db
      .from('offences')
      .select('area', 'age', 'gender', 'year', 'month')
      .where(filterArray[1], 'IN', values[1])
      .orderBy('year', 'asc')
      .then((rows) => {
        for (row of rows) {
          data.push(`[${row['area']},${row['age']},${row['gender']},${row['year']},${row['month']}]`);
        }
        res.json({
          data
        })
      })
      .catch((err) => {
        console.log(err);
        res.json({ "Error": true, "Message": "Error executing MySQL query" })
      })
  } else if (numFilters == 3) {
    req.db
      .from('offences')
      .select('area', 'age', 'gender', 'year', 'month')
      .where(filterArray[1], 'IN', values[1])
      .where(filterArray[2], 'IN', values[2])
      .orderBy('year', 'asc')
      .then((rows) => {
        for (row of rows) {
          data.push(`[${row['area']},${row['age']},${row['gender']},${row['year']},${row['month']}]`);
        }
        res.json({
          data
        })
      })
      .catch((err) => {
        console.log(err);
        res.json({ "Error": true, "Message": "Error executing MySQL query" })
      })
  } else if (numFilters == 4) {
    req.db
      .from('offences')
      .select('area', 'age', 'gender', 'year', 'month')
      .where(filterArray[1], 'IN', values[1])
      .where(filterArray[2], 'IN', values[2])
      .where(filterArray[3], 'IN', values[3])
      .orderBy('year', 'asc')
      .then((rows) => {
        for (row of rows) {
          data.push(`[${row['area']},${row['age']},${row['gender']},${row['year']},${row['month']}]`);
        }
        res.json({
          data
        })
      })
      .catch((err) => {
        console.log(err);
        res.json({ "Error": true, "Message": "Error executing MySQL query" })
      })
  } else if (numFilters == 5) {
    req.db
      .from('offences')
      .select('area', 'age', 'gender', 'year', 'month')
      .where(filterArray[1], 'IN', values[1])
      .where(filterArray[2], 'IN', values[2])
      .where(filterArray[3], 'IN', values[3])
      .where(filterArray[4], 'IN', values[4])
      .orderBy('year', 'asc')
      .then((rows) => {
        for (row of rows) {
          data.push(`[${row['area']},${row['age']},${row['gender']},${row['year']},${row['month']}]`);
        }
        res.json({
          data
        })
      })
      .catch((err) => {
        console.log(err);
        res.json({ "Error": true, "Message": "Error executing MySQL query" })
      })
  } else if (numFilters == 6) {
    req.db
      .from('offences')
      .select('area', 'age', 'gender', 'year', 'month')
      .where(filterArray[1], 'IN', values[1])
      .where(filterArray[2], 'IN', values[2])
      .where(filterArray[3], 'IN', values[3])
      .where(filterArray[4], 'IN', values[4])
      .where(filterArray[5], 'IN', values[5])
      .orderBy('year', 'asc')
      .then((rows) => {
        for (row of rows) {
          data.push(`[${row['area']},${row['age']},${row['gender']},${row['year']},${row['month']}]`);
        }
        res.json({
          data
        })
      })
      .catch((err) => {
        console.log(err);
        res.json({ "Error": true, "Message": "Error executing MySQL query" })
      })
  }
});
//--------------------------------- HELPERS-------------------------------
// OFFENCES
router.get("/Offences", function (req, res, next) {
  req.db.from('offence_columns').select("pretty")
    .then((rows) => {
      res.json({ "Offences": rows.map(row => row.pretty) })
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
      res.json({ "Areas": rows.map(row => row.area) })
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
      res.json({ "Ages": rows.map(row => row.age) })
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
      res.json({ "Genders": rows.map(row => row.gender) })
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
      res.json({ "Years": rows.map(row => row.year) })
    })
    .catch((err) => {
      console.log(err);
      res.json({ "Error": true, "Message": "Error in MySQL query" })
    })
})

module.exports = router;
