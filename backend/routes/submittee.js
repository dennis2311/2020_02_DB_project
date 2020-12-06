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

router.get('/approvedtasks/:userid', function(req, res, next) {

    mariadb.query(`SELECT TASK_NAME, APPROVED FROM PARTICIPATES_IN WHERE SUBMITEE_ID=\'${req.params.userid}\';`, function(err, rows, fields){
        if(!err){
            res.send(JSON.stringify(rows))
        } else {
            res.send(false)
        }
        
    });

});

router.get('/selectedtask/:taskName', function(req, res, next) {

    mariadb.query(`SELECT NAME FROM ORIGINAL_DATA_TYPE WHERE TASK_NAME=\'${req.params.taskName}\';`, function(err, rows, fields){
        if(!err){
            res.send(JSON.stringify(rows))
        } else {
            res.send(false)
        }
        
    });

});

router.post('/submonitor', function(req, res, next) {
    const params = req.body.params;
    
    var response = {
        tasks :[],
        evalGrade : [],
        fileNumByTask: [],
        storedTuplesNum: [],
        // subName : [],
        orgFilePresent: [],
        PDSFFilePresend: [],

    }


    
    mariadb.query(`SELECT EVALUATION_GRADE FROM ACCOUNT where ID = \'${params.userid}\'`, function(err, rows, fields){


        if(!err){
            console.log(rows)
            response.evalGrade.push(rows[0].EVALUATION_GRADE)
            
        } else {

            res.send('erro' + err)
        }

    })

    var taskS = []

    mariadb.query(`SELECT NAME FROM TASK WHERE TASK.NAME IN (SELECT TASK_NAME FROM PARTICIPATES_IN WHERE PARTICIPATES_IN.SUBMITEE_ID =\'${params.userid}\' AND PARTICIPATES_IN.APPROVED =1);`, function(err, rows1, fields1){

        if(!err){
            taskS = rows1
            console.log(taskS)
            console.log(rows1)
            response.tasks.push(rows1)
        } else {
            res.send('erro' + err)
        }
    })

    mariadb.query(`SELECT NAME FROM TASK WHERE TASK.NAME IN (SELECT TASK_NAME FROM PARTICIPATES_IN WHERE PARTICIPATES_IN.SUBMITEE_ID =\'${params.userid}\' AND PARTICIPATES_IN.APPROVED =1);`, function(err, rows1, fields1){

        if(!err){
            console.log(rows1)
            response.tasks.push(rows1)
       
            // for(var i=0; i< rows1.length; i++){
                
                var taskName = taskS[0].NAME
                console.log(taskName)
                console.log(`SELECT COUNT(SERIAL_NUM) FROM ORIGINAL_DATA_SEQUENCE_FILE WHERE SUBMITEE_ID = \'${params.userid}\' AND ORIG_DATA_TYPE_ID IN (SELECT ID FROM ORIGINAL_DATA_TYPE WHERE TASK_NAME = \'${taskName}\')`)                        

                mariadb.query(`SELECT COUNT(SERIAL_NUM) FROM ORIGINAL_DATA_SEQUENCE_FILE WHERE SUBMITEE_ID = \'${params.userid}\' AND ORIG_DATA_TYPE_ID IN (SELECT ID FROM ORIGINAL_DATA_TYPE WHERE TASK_NAME = \'${taskName}\')`, function(err, rows2, fields2){
                    if(!err){
                        console.log(`SELECT COUNT(SERIAL_NUM) FROM ORIGINAL_DATA_SEQUENCE_FILE WHERE SUBMITEE_ID = \'${params.userid}\' AND ORIG_DATA_TYPE_ID IN (SELECT ID FROM ORIGINAL_DATA_TYPE WHERE TASK_NAME = \'${taskName}\')`)
                        console.log(rows2)
                        response.fileNumByTask.push(rows2)
  
                        mariadb.query(`SELECT SUM(TOTAL_TUPLE_NUM) FROM PARSING_DATA_SEQUENCE_FILE WHERE TASK_NAME = \'${taskName}\' AND SUBMITTEE_ID = \'${params.userid}\' AND STORE_CONDITION = 'P'`, function(err, rows3, fields3){ //submittee
                            if(!err){
                                console.log(`SELECT SUM(TOTAL_TUPLE_NUM) AS cnt FROM PARSING_DATA_SEQUENCE_FILE WHERE TASK_NAME = \'${taskName}\' AND SUBMITTEE_ID = \'${params.userid}\'`)
                                console.log(rows3)
                                response.storedTuplesNum.push(rows3) 
                               
                                mariadb.query(`SELECT * FROM ORIGINAL_DATA_TYPE WHERE TASK_NAME = \'${taskName}\' AND ID IN (SELECT ORIG_DATA_TYPE_ID FROM ORIGINAL_DATA_SEQUENCE_FILE WHERE SUBMITEE_ID = \'${params.userid}\')` , function(err, rows4, fields4){

                                    if(!err){
                                        console.log(rows4)
                                        response.orgFilePresent.push(rows4) 


                                        for(var j=0; j < rows4.length; j++){

                                            // mariadb.query(`SELECT * FROM PARSING_DATA_SEQUENCE_FILE WHERE TASK_NAME = \'${taskName}\' AND SUBMITTEE_ID = \'${params.userid}\' AND OGDSF_SERIAL_NUM ORDER BY OGDSF_SERIAL_NUM`, function(err, rows5, fields5){
                                                mariadb.query(`SELECT * FROM PARSING_DATA_SEQUENCE_FILE WHERE TASK_NAME = \'${taskName}\' AND OGDSF_SERIAL_NUM IN(SELECT SERIAL_NUM FROM ORIGINAL_DATA_SEQUENCE_FILE WHERE SUBMITTEE_ID = \'${params.userid}\') ORDER BY OGDSF_SERIAL_NUM`, function(err, rows5, fields5){
                                                if(!err){

                                                    console.log(rows5)
                                                    response.PDSFFilePresend.push(rows5) 
                                                    res.send(response)
                                                } else {
                                                    res.send('erro' + err)
                                                }
                                            })

                                        }
    
                                    } else {
                                        res.send('erro' + err)
                                    }
                                })

                            } else {
                                res.send('erro' + err)
                            }
                        })
                    } else {
                        res.send('erro' + err)
                    }
                })
            // }
        } else {    
            res.send('erro' + err)
        }
    })

    

});


module.exports = router;