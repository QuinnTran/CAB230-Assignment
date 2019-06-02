var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

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