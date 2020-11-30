var express = require('express');
var router = express.Router();
var mariadb = require('../mariadb');

router.get('/membermanage', function(req, res, next) {
    var response = {
        success : false,
        users : [],
        message : ''
    }

    var list = []
    
    mariadb.query(`SELECT ID, ROLE FROM ACCOUNT WHERE ROLE IN (\'ASE\', \'SUB\')`, function(err, rows, fields){
        if(!err){
            response.success = true
            res.send(JSON.stringify(rows))
        } else {
            response.message = "서버 오류입니다. 문제가 계속되는 경우 관리자에게 문의하세요.";
        }
    });
});

router.get('/membermange/:id', function(req, res, next){
    console.log('params : '+req.params)
    console.log('paht : '+req.path)
    console.log('query : '+req.query)
    res.send(['awesome user'])
})

module.exports = router;