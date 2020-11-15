var express = require('express');
var router = express.Router();
var mariadb = require('../mariadb');

const ADMIN = 'admin';
const ASSESSOR = 'assessor';
const SUBMITTEE = 'submittee';

router.post('/', function(req, res, next){
    const user = req.body.user;

    var response = {
        success : false,
        role : '',
        message : ''
    }

    mariadb.query(`SELECT password, role FROM sample_account WHERE username = \'${user.userid}\'`, function(err, rows, fields){
        if(!err){
            if(rows.length != 0){
                console.log("User exists. Check for password correctness")
                if(user.password === rows[0].password){
                    console.log("Login permitted")
                    response.success = true;
                    response.role = rows[0].role;
                    response.message = `You logged in as ${response.role}`;
                    res.json(response);
                } else {
                    response.message = "Password incorrect. Please try again";
                    res.json(response)
                }
            } else {
                console.log("There's no user with given username")
                response.message = "There's no user";
                res.json(response)
            }     
        } else {
            response.message = "DB ERROR. PLEASE COTACT TO ADMINISTRATOR";
            res.json(response);
        }
    });

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