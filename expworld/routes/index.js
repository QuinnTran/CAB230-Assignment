var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get("/offences", function(req,res, next) {
  req.db.from('offences').select("id")
  .then((rows) => {
  res.json({"Error" : false, "Message" : "Success", "offences" : rows})
  })
  .catch((err) => {
  console.log(err);
  res.json({"Error" : true, "Message" : "Error in MySQL query"})
  })
 });

 router.get("/offences/:Area",function(req,res,next) {
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
