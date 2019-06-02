var express = require('express');
const mysql = require('mysql');
var bcrypt = require("bcrypt")
var router = express.Router();
var jwt = require('jsonwebtoken');

/**
 * REG
 */
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
    .then(function (result) {
      res.status(201).json({
        "message": "yay! you've successfully registered y our user account :)"
      })
    })
    .catch((err) => {
      res.status(400).json({
        "message": "oops! It looks like that user already exists :("
      })
    })
});

/**
 *  LOG
 */
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
        res.status(200).send({
          "token": token,
          "access_token": token,
          "Token type": "Bearer",
          "expires_in": expire
        });
      } else {
        res.json(401, { Message: "invalid login - bad password" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.json({ "Error": true, "Message": "Error in MySQL query" })
    })
});

module.exports = router;