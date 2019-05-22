var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
// Search
router.get("/search", function(req,res, next) {
  req.db.from('search').select("offence","area","age","gender","year","month")
  .then((rows) => {
  res.json({"Error" : false, "Message" : "Success", "search" : rows})
  })
  .catch((err) => {
  console.log(err);
  res.json({"Error" : true, "Message" : "Error in MySQL query"})
  })
 });

// Offences
router.get("/offences", function(req,res, next) {
  req.db.from('offences').select("pretty")
  .then((rows) => {
  res.json({"Error" : false, "Message" : "Success", "offences" : rows})
  })
  .catch((err) => {
  console.log(err);
  res.json({"Error" : true, "Message" : "Error in MySQL query"})
  })
 });
// Areas
 router.get("/offences/areas",function(req,res,next) {
  req.db.from('offences').select('*').where('Area','=',req.params.Area)
  .then((rows) => {
  res.json({"Error" : false, "Message" : "Success", "Area" : rows})
  })
  .catch((err) => {
  console.log(err);
  res.json({"Error" : true, "Message" : "Error executing MySQL query"})
  })
 });
 // Ages
 router.get("/ages",function(req,res,next) {
  req.db.from('offences').select('*').where('Area','=',req.params.Area)
  .then((rows) => {
  res.json({"Error" : false, "Message" : "Success", "Area" : rows})
  })
  .catch((err) => {
  console.log(err);
  res.json({"Error" : true, "Message" : "Error executing MySQL query"})
  })
 });// Genders
 router.get("/genders",function(req,res,next) {
  req.db.from('offences').select('*').where('Area','=',req.params.Area)
  .then((rows) => {
  res.json({"Error" : false, "Message" : "Success", "Area" : rows})
  })
  .catch((err) => {
  console.log(err);
  res.json({"Error" : true, "Message" : "Error executing MySQL query"})
  })
 });
 // Years
 router.get("/years",function(req,res,next) {
  req.db.from('offences').select('*').where('Area','=',req.params.Area)
  .then((rows) => {
  res.json({"Error" : false, "Message" : "Success", "Area" : rows})
  })
  .catch((err) => {
  console.log(err);
  res.json({"Error" : true, "Message" : "Error executing MySQL query"})
  })
 });
module.exports = router;
