var express = require('express');
var router = express.Router();
var mariadb = require('../mariadb');

router.post('/taskcreate', function(req, res, next){
    const user = req.body.user

    var response = {
        success : false,
        message : ''
    }

    if (user.taskName===''){
        response.message = '테스크 이름은 필수 항목입니다.';
        res.json(response);
    }
    else if (user.taskDescription===''){
        response.message = '테스크 설명은 필수 항목입니다.';
        res.json(response);
    }
    else if (user.taskTableName===''){
        response.message = '테스크 데이터 테이블 이름은 필수 항목입니다.';
        res.json(response);
    }
    else if (user.taskTableSchemaInfo===''){
        response.message = '테스크 데이터 테이블 스키마 정보는 필수 항목입니다.';
        res.json(response);
    }
    else {
        mariadb.query(`SELECT NAME FROM TASK WHERE NAME =\'${user.id}\'`, function(err, rows, fields){
            if(!err){
                if(rows.length != 0){
                    response.message = '이미 생성된 테스크 입니다.';
                    res.json(response);
                }
            } else {
                response.message = "서버 오류입니다. 문제가 계속되는 경우 관리자에게 문의하세요.";
                res.json(response);
            }
        });
        mariadb.query(`INSERT INTO TASK (NAME, TASK_DESCRIPTION, MIN_UPLOAD_PERIOD, TASK_TABLE_NAME, TASK_TABLE_SCHEMA_INFO,ADMIN_ID) VALUES (\'${user.taskName}\', \'${user.taskDescription}\', \'${user.min_upload_period}\',\'${user.taskTableName}\',\'${user.taskTableSchemaInfo}\', 'admin')`, function(err,rows, fields){
            if(!err){
                // task data table 생성
                // response.success = true
                // response.message = '여기까지 에러 없음';
                // res.json(response);
                
            } else {
                console.log(err)
                response.message = "서버 오류입니다. 문제가 계속되는 경우 관리자에게 문의하시기 바랍니다.";
                res.json(response);
            }
        });
    }
});

router.get('/membermanage', function(req, res, next) {    
    mariadb.query(`SELECT ID, ROLE FROM ACCOUNT WHERE ROLE IN (\'ASE\', \'SUB\')`, function(err, rows, fields){
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

router.get('/membermanage/:id', function(req, res, next){
    console.log('params : '+req.params)
    console.log('paht : '+req.path)
    console.log('query : '+req.query)
    res.send(['awesome user'])
})

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
