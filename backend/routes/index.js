var express = require('express');
const mysql = require('mysql');
var bcrypt = require("bcrypt")
var router = express.Router();
var jwt = require('jsonwebtoken');

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
        var expire = Math.floor(Date.now() / 1000) + (3600);
        // -----ASSIGNED JWT-----
        var token = jwt.sign({ user: email, exp: expire, time: Date.now() }, 'shhhhh');
        res.send({
          access_token: token,
          "Token type": "Bearer",
          expires_in: expire
        });
      } else {
        res.send(401, "invalid login - bad password");
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
  var column = req.query.offence.split("").join("").toLowerCase();

  //Show error if token is not match with login token
  try {
    var decoded = jwt.verify(token, 'root');
  }
  catch (err) {
    console.log(err);
    res.json({
      "error": "oops! it looks like you're missing the authorization header"
    })
  }

  //loop through every filters 
  for (i of filter) {
    ++numFilters;
  }

  var values = [];
  var filterArray = [];
  var varArray = [];

  for (var i = 0; i < numFilters; i++) { //push data into array
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
      .select('offences.area as LGA')
      .sum(`${column} as total`)
      .select('areas.lat', 'areas.lng')
      .join('areas', 'areas.area', '=', 'offences.area')
      .groupBy('offences.area')
      .then((rows) => {
        for (row of rows) {
          data.push(`[${row['LGA']},${row['total']},${row['lat']},${row['lng']}]`);
        }
        res.json({
          data
        })
      })
      .catch((err) => {
        console.log(err);
        res.json({ "error": "oops! it looks like you're missing the authorization header" })
      })

  } else if (numFilters == 2) {
    req.db
    req.db
      .from('offences')
      .select('offences.area as LGA')
      .where(filterArray[1], 'IN', values[1])
      .sum(`${column} as total`)
      .select('areas.lat', 'areas.lng')
      .join('areas', 'areas.area', '=', 'offences.area')
      .groupBy('offences.area')
      .then((rows) => {
        for (row of rows) {
          data.push(`[${row['LGA']},${row['total']},${row['lat']},${row['lng']}]`);
        }
        res.json({
          data
        })
      })
      .catch((err) => {
        console.log(err);
        res.json({ "error": "oops! it looks like you're missing the authorization header" })
      })
  } else if (numFilters == 3) {
    req.db
      .from('offences')
      .select('offences.area as LGA')
      .where(filterArray[1], 'IN', values[1])
      .where(filterArray[2], 'IN', values[2])
      .sum(`${column} as total`)
      .select('areas.lat', 'areas.lng')
      .join('areas', 'areas.area', '=', 'offences.area')
      .groupBy('offences.area')
      .then((rows) => {
        for (row of rows) {
          data.push(`[${row['LGA']},${row['total']},${row['lat']},${row['lng']}]`);
        }
        res.json({
          data
        })
      })
      .catch((err) => {
        console.log(err);
        res.json({ "error": "oops! it looks like you're missing the authorization header" })
      })
  } else if (numFilters == 4) {
    req.db
      .from('offences')
      .select('offences.area as LGA')
      .where(filterArray[1], 'IN', values[1])
      .where(filterArray[2], 'IN', values[2])
      .where(filterArray[3], 'IN', values[3])
      .sum(`${column} as total`)
      .select('areas.lat', 'areas.lng')
      .join('areas', 'areas.area', '=', 'offences.area')
      .groupBy('offences.area')
      .then((rows) => {
        for (row of rows) {
          data.push(`[${row['LGA']},${row['total']},${row['lat']},${row['lng']}]`);
        }
        res.json({
          data
        })
      })
      .catch((err) => {
        console.log(err);
        res.json({ "error": "oops! it looks like you're missing the authorization header" })
      })
  } else if (numFilters == 5) {
    req.db
      .from('offences')
      .select('offences.area as LGA')
      .where(filterArray[1], 'IN', values[1])
      .where(filterArray[2], 'IN', values[2])
      .where(filterArray[3], 'IN', values[3])
      .where(filterArray[4], 'IN', values[4])
      .sum(`${column} as total`)
      .select('areas.lat', 'areas.lng')
      .join('areas', 'areas.area', '=', 'offences.area')
      .groupBy('offences.area')
      .then((rows) => {
        for (row of rows) {
          data.push(`[${row['LGA']},${row['total']},${row['lat']},${row['lng']}]`);
        }
        res.json({
          data
        })
      })
      .catch((err) => {
        console.log(err);
        res.json({ "error": "oops! it looks like you're missing the authorization header" })
      })
  } else if (numFilters == 6) {
    req.db
      .from('offences')
      .select('offences.area as LGA')
      .where(filterArray[1], 'IN', values[1])
      .where(filterArray[2], 'IN', values[2])
      .where(filterArray[3], 'IN', values[3])
      .where(filterArray[4], 'IN', values[4])
      .where(filterArray[5], 'IN', values[5])
      .sum(`${column} as total`)
      .select('areas.lat', 'areas.lng')
      .join('areas', 'areas.area', '=', 'offences.area')
      .groupBy('offences.area')
      .then((rows) => {
        for (row of rows) {
          data.push(`[${row['LGA']},${row['total']},${row['lat']},${row['lng']}]`);
        }
        res.json({
          data
        })
      })
      .catch((err) => {
        console.log(err);
        res.json({ "error": "oops! it looks like you're missing the authorization header" })
      })
  }
});
//--------------------------------- HELPERS-------------------------------
// OFFENCES
router.get("/offences", function (req, res, next) {
  req.db.from('offence_columns').select("pretty")
    .then((rows) => {
      res.json({ "offences": rows.map(row => row.pretty) })
    })
    .catch((err) => {
      console.log(err);
      res.json({ "Error": true, "Message": "Error in MySQL query" })
    })
});
// AREAS
router.get("/areas", function (req, res, next) {
  req.db.from('areas').select("area")
    .then((rows) => {
      res.json({ "areas": rows.map(row => row.area) })
    })
    .catch((err) => {
      console.log(err);
      res.json({ "Error": true, "Message": "Error in MySQL query" })
    })
});
// AGES
router.get("/ages", function (req, res, next) {
  req.db.from('offences').select('age').distinct("age")
    .then((rows) => {
      res.json({ "ages": rows.map(row => row.age) })
    })
    .catch((err) => {
      console.log(err);
      res.json({ "Error": true, "Message": "Error in MySQL query" })
    })
});
// GENDERS
router.get("/genders", function (req, res, next) {
  req.db.from('offences').select("gender").distinct("gender")
    .then((rows) => {
      res.json({ "genders": rows.map(row => row.gender) })
    })
    .catch((err) => {
      console.log(err);
      res.json({ "Error": true, "Message": "Error in MySQL query" })
    })
});
// YEARS
router.get("/years", function (req, res, next) {
  req.db.from('offences').select("year").distinct("year")
    .then((rows) => {
      res.json({ "years": rows.map(row => row.year) })
    })
    .catch((err) => {
      console.log(err);
      res.json({ "Error": true, "Message": "Error in MySQL query" })
    })
})

module.exports = router;
