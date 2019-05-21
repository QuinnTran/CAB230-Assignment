var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get("/users", function(req,res, next) {
  req.db.from('users').select("email", "password")
  .then((rows) => {
  res.json({"Error" : false, "Message" : "Success", "users" : rows})
  })
  .catch((err) => {
  console.log(err);
  res.json({"Error" : true, "Message" : "Error in MySQL query"})
  })
 });

module.exports = router;
