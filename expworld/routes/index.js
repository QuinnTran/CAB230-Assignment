var express = require('express');
const mysql = require('mysql');

var router = express.Router();

// HOME
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Crime Database' });
});

//--------------------------------- SEARCH-------------------------------
router.get("/search/:column",function(req,res){
  var query = "SELECT * FROM ?? WHERE ??=?";
  var table = ["offence_columns","column",req.params.column];
  query = mysql.format(query,table);
  req.db.query(query,function(err,rows){
    if(err) {
      res.json({"Error" : true, "Message" : "Error executing MySQL query"});
    } else {
      res.json({"Offence" : rows});
    }
  });
});

//--------------------------------- HELPERS-------------------------------
// OFFENCES
router.get("/offences",function(req,res){
  var query = "SELECT pretty FROM ??";
  var table = ["offence_columns"];
  query = mysql.format(query,table);
  req.db.query(query,function(err,rows){
  if(err) {
    res.json({"Error" : true, "Message" : "Error executing MySQL query"});
  } else {
    res.json({"Offences" : rows});
  }
  });
});
// AREAS
router.get("/areas",function(req,res){
  var query = "SELECT distinct(area) FROM ??";
  var table = ["offences"];
  query = mysql.format(query,table);
  req.db.query(query,function(err,rows){
  if(err) {
  res.json({"Error" : true, "Message" : "Error executing MySQL query"});
  } else {
  res.json({"Area" : rows});
  }
  });
});
// AGES
router.get("/ages",function(req,res){
  var query = "SELECT distinct(age) FROM ??";
  var table = ["offences"];
  query = mysql.format(query,table);
  req.db.query(query,function(err,rows){
  if(err) {
  res.json({"Error" : true, "Message" : "Error executing MySQL query"});
  } else {
  res.json({"Age" : rows});
  }
  });
});
// GENDERS
router.get("/genders",function(req,res){
  var query = "SELECT distinct(gender) FROM ??";
  var table = ["offences"];
  query = mysql.format(query,table);
  req.db.query(query,function(err,rows){
  if(err) {
  res.json({"Error" : true, "Message" : "Error executing MySQL query"});
  } else {
  res.json({"Gender" : rows});
  }
  });
});
// YEARS
router.get("/years",function(req,res){
  var query = "SELECT distinct(year) FROM ??";
  var table = ["offences"];
  query = mysql.format(query,table);
  req.db.query(query,function(err,rows){
  if(err) {
  res.json({"Error" : true, "Message" : "Error executing MySQL query"});
  } else {
  res.json({"Year" : rows});
  }
  });
});


module.exports = router;
