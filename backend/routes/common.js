var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next){
    console.log("common.js");
    res.send({msg:"firstpage"});
})

router.get('/createaccount', function(req, res, next){
    console.log("createaccount");
    res.send({msg:"create your account"});
})

router.get('/findaccount', function(req, res, next){
    console.log("find ID/password");
    res.send({msg:"forgot your account?"});
})

module.exports = router;