const { json } = require('express');
var express = require('express');
var router = express.Router();
var mariadb = require('../mariadb');

router.get('/membermanage', function(req, res, next) {
    var response = {
        success : 'false',
        users : [],
        message : ''
    }

    var list = []

    mariadb.query(`SELECT ID, ROLE FROM ACCOUNT WHERE ROLE IN (\'ASE\', \'SUB\')`, function(err, rows, fields){
        if(!err){
            response.success = true
            var string = JSON.stringify(rows)
            var json = JSON.parse(string)
            for(let user of json){
                // response.users.push({ID:user.ID, ROLE:user.ROLE})
                list.push({ID:user.ID, ROLE:user.ROLE})
            }
            console.log(list)
        } else {
            response.message = "서버 오류입니다. 문제가 계속되는 경우 관리자에게 문의하세요.";
        }
    });
    res.send(JSON.stringify(list));
});


module.exports = router;