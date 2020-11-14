var express = require('express');
var router = express.Router();
var mariadb = require('../mariadb');

const ADMIN = 'admin';
const ASSESSOR = 'assessor';
const SUBMITTEE = 'submittee';

router.post('/', function(req, res, next){
    const user = req.body.user;
    console.log(user.userid);

    // TODO
    // DB connection here

    mariadb.query("select * from sample_account", function(err, rows, fields){
        if(!err){
            // console.log(rows);
            console.log(rows[0].username);
        } else {
            console.log(err)
        }
    });

    //

    res.json({
        role : ADMIN
    })

})

router.post('/createaccount', function(req, res, next){
    const user = {
        'userid' : req.body.user.userid,
        'name': req.body.user.name,
        'password': req.body.user.password
    };

    // TODO
    // DB connection here

    res.json({
        success: true,
        message: 'Account created successfully.\nPlease login for service.'
    })
})

router.get('/findaccount', function(req, res, next){
})

module.exports = router;