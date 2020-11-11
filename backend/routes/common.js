var express = require('express');
var router = express.Router();

const ADMIN = 'admin';
const ASSESSOR = 'assessor';
const SUBMITTEE = 'submittee';

router.post('/', function(req, res, next){
    const user = req.body.user;
    console.log(user.userid);

    // TODO
    // DB connection here

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