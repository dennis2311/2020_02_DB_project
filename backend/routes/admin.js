var express = require('express');
var router = express.Router();
var mariadb = require('../mariadb');

router.get('/membermanage', function(req, res, next) {    
    mariadb.query(`SELECT ID, ROLE, GENDER, BIRTHDATE FROM ACCOUNT WHERE ROLE IN (\'ASE\', \'SUB\');`, function(err, rows, fields){
        if(!err){
            res.send(JSON.stringify(rows))
        } else {
            res.send(false)
        }
    });
});

router.get('/membermanage_task', function(req, res, next) {    
    mariadb.query(`SELECT TASK.NAME, ID, ROLE FROM TASK, ACCOUNT, PARTICIPATES_IN WHERE (SUBMITEE_ID=ID) AND (TASK_NAME=TASK.NAME);`, function(err, rows, fields){
        if(!err){
            res.send(JSON.stringify(rows))
        } else {
            res.send(false)
        }
    });
});

router.get('/membermanage/:id', function(req, res, next){
    mariadb.query(`SELECT NAME, ID, BIRTHDATE, GENDER, ADDRESS, PHONE, ROLE, EVALUATION_GRADE FROM ACCOUNT WHERE ID=\'${req.params.id}\';`, function(err,rows,fields){
        if(!err){
            res.send(JSON.stringify(rows))
        } else {
            res.send(false)
        }
    });
});

router.get('/membermanage/:id/task', function(req, res, next){
    mariadb.query(`SELECT TASK_NAME FROM PARTICIPATES_IN WHERE SUBMITEE_ID=\'${req.params.id}\';`, function(err,rows,fields){
        if(!err){
            res.send(JSON.stringify(rows))
        } else {
            res.send(false)
        }
    });
});

router.post('/taskmanage', function(req, res, next){
    const accept = req.body.accept;
    console.log(accept)
    var response = {
        success : false,
        all_tasks: [],
        tasks_YSUB: [],
        message : ''
    }

    for(i=0; i<accept.length; i++){
        console.log(accept)
        mariadb.query(`UPDATE PARTICIPATES_IN SET APPROVED=1 \
        WHERE TASK_NAME=\'${accept[i][0]}\' AND SUBMITEE_ID=\'${accept[i][1]}\'`)
    }

    // for each task that exists
    mariadb.query('SELECT NAME FROM TASK', function(err1, rows1, fields1){
        if(!err1){
            response.success = true
            for (var i = 0; i < rows1.length; i++) {
                // save each task name
                task_name = rows1[i].NAME
                response.all_tasks.push([task_name])
            }
            query2 = `SELECT TASK.NAME, SUBMITEE_ID, EVALUATION_GRADE \
            FROM PARTICIPATES_IN, TASK, ACCOUNT \
            WHERE TASK_NAME=TASK.NAME AND APPROVED=0 AND ID=SUBMITEE_ID`;
            mariadb.query(query2, function(err2, rows2, feilds2){
                for (var j = 0; j < rows2.length; j++){
                    // send submitee id(applicant of this task)
                    // send the evaluation grade of the submitee(for admin to approve/or not)
                    t_name = rows2[j].NAME
                    s_id = rows2[j].SUBMITEE_ID
                    e_grade = rows2[j].EVALUATION_GRADE
                    response.tasks_YSUB.push([t_name, s_id, e_grade])
                }
                res.send(response)
            })
        } else {
            response.message = "서버 오류입니다. 문제가 계속되는 경우 관리자에게 문의하세요."
        }
    })
})

module.exports = router;
