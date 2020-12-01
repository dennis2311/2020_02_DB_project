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

router.get('/tasklist/:taskname/:userid', function(req, res, next) {
    const taskname = req.params.taskname
    const userid = req.params.userid

    var response = {
        success : false,
        message : ''
    }

    mariadb.query(`INSERT INTO PARTICIPATES_IN (TASK_NAME, SUBMITEE_ID) VALUES (?, ?)`,[taskname, userid] ,function(err, rows, fields){
        if(!err){
            response.success = true
            response.message = 'task 신청이 완료되었습니다.';
            res.json(response)
        } else {
            response.message = "서버 오류입니다. 문제가 계속되는 경우 관리자에게 문의하세요.";
            console.log(taskname);
            console.log(userid);
            console.log(err)
            res.json(response)
        }
    });

});


module.exports = router;