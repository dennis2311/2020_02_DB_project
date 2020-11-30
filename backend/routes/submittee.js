var express = require('express');
var router = express.Router();
var mariadb = require('../mariadb');

router.get('/tasklist', function(req, res, next) {
    var response = {
        success : false,
        tasks : [],
        message : ''
    }

    mariadb.query(`SELECT NAME, MIN_UPLOAD_PERIOD ADMIN_ID FROM TASK`, function(err, rows, fields){
        if(!err){
            response.success = true
            res.send(JSON.stringify(rows))
        } else {
            response.message = "서버 오류입니다. 문제가 계속되는 경우 관리자에게 문의하세요.";
        }
    });
});



module.exports = router;