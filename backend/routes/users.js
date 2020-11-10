var express = require('express');
var router = express.Router();
var users = require('../userdata.json');

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log("Users page request");
  res.send(users);
});

router.get('/:id', function(req, res, next){
  var id = parseInt(req.params.id, 10);
  var user = users.filter(each_user => each_user.id === id);
  res.send(user[0])
})

module.exports = router;
