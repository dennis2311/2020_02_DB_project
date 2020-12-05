var express = require('express');
var router = express.Router();
var mariadb = require('../mariadb');

router.get('/tasklist', function(req, res, next) {

    var response = {
        success : false,
        tasks : [],
        message : ''
    }

    mariadb.query(`SELECT NAME, TASK_DESCRIPTION, MIN_UPLOAD_PERIOD, ADMIN_ID FROM TASK`, function(err, rows, fields){
        if(!err){
            response.success = true
            res.send(JSON.stringify(rows))
        } else {
            res.send(false)
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
            if(err.code == 'ER_DUP_ENTRY'){
                response.message = "이미 신청한 태스크입니다.";
            }
            else{
                response.message = "서버 오류입니다. 문제가 계속되는 경우 관리자에게 문의하세요.";
            }
            console.log(taskname);
            console.log(userid);
            console.log(err)
            res.json(response)
        }
    });

});

router.get('/approvedtasks', function(req, res, next) {

    var response = {
        success : false,
        tasks : [],
        message : ''
    }

    mariadb.query(`SELECT TASK_NAME, APPROVED FROM PARTICIPATES_IN`, function(err, rows, fields){
        if(!err){
            response.success = true
            res.send(JSON.stringify(rows))
        } else {
            res.send(false)
        }
        
    });

});

module.exports = router;