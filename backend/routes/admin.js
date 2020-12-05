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
                // query change
                mariadb.query(`CREATE TABLE customers (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), address VARCHAR(255))`, function(err,rows, fields){
                    if(!err){
                        response.success = true
                        response.message = '테스크 생성이 완료되었습니다. 오리지널 데이터 타입 생성 페이지로 이동합니다.';
                        res.json(response);
                    } else {
                        console.log(err)
                        response.message = "서버 오류입니다. 문제가 계속되는 경우 관리자에게 문의하시기 바랍니다.";
                        res.json(response);
                    }
                });
                
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
    console.log('path : '+req.path)
    console.log('query : '+req.query)
    res.send(['awesome user'])
})

router.post('/taskmanage', function(req, res, next){
    const accept = req.body.accept;
    const pass_grade = req.body.pass_grade;
    const task_grade_sel = req.body.task_grade_sel
    
    var response = {
        success : false,
        all_tasks: [],
        tasks_YSUB: [],
        message : ''
    }

    if (task_grade_sel != ""){
        mariadb.query(`UPDATE TASK SET PASS_GRADE=\'${pass_grade}\'
            WHERE NAME=\'${task_grade_sel}\'`)
    }
        
    for(i=0; i<accept.length; i++){
        // change approved to 1 if admin approves to participate in task for submitee
        console.log(accept)
        mariadb.query(`UPDATE PARTICIPATES_IN SET APPROVED=1 \
        WHERE TASK_NAME=\'${accept[i][0]}\' AND SUBMITEE_ID=\'${accept[i][1]}\'`)
    }

    // for each task that exists
    mariadb.query('SELECT NAME, PASS_GRADE FROM TASK', function(err1, rows1, fields1){
        if(!err1){
            response.success = true
            // change pass grade using input of admin
            for (var i = 0; i < rows1.length; i++) {
                // save each task name
                task_name = rows1[i].NAME
                p_grade = rows1[i].PASS_GRADE
                response.all_tasks.push([task_name, p_grade])
            }
            
            query3 = `SELECT TASK.NAME, SUBMITEE_ID, EVALUATION_GRADE\
            FROM PARTICIPATES_IN, TASK, ACCOUNT \
            WHERE TASK_NAME=TASK.NAME AND APPROVED=0 AND ID=SUBMITEE_ID`;
            mariadb.query(query3, function(err2, rows2, feilds2){
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

router.post('/taskstatistics', function(req, res, next){
    var response = {
        success : false,
        by_task : [],
        by_orgdt : [],
        message : ''
    }
    // sub_id = "hi", participate task = "task1, task2"
    var by_task_shape = {
        "task_name" : null,
        "count_file" : null,
        "tuple_count" : null,
        "submitees" : [],
    }

    var sub_task_json = {
        "sub_id" : null,
        "participate_task" : null
    }

    var by_orgdt_shape = {
        "dt_id" : null,
        "count_file" : null,
        "tuple_count" : null,
    }

    // files per each task & (count tuples in passed TDT related to task)
    var task_count_file_tuple = 
    `WITH SN
    AS
    (SELECT TASK.NAME, COUNT(SERIAL_NUM) AS SN_COUNT \
    FROM TASK, ORIGINAL_DATA_TYPE AS ODT, ORIGINAL_DATA_SEQUENCE_FILE \
    WHERE ORIG_DATA_TYPE_ID=ODT.ID AND TASK_NAME=NAME),
    TTN
    AS
    (SELECT TASK.NAME, SUM(TOTAL_TUPLE_NUM) AS SUM_TTN \
    FROM TASK, PARSING_DATA_SEQUENCE_FILE \
    WHERE TASK_NAME=NAME AND STORE_CONDITION="P")
    SI
    AS 
    (SELECT TASK.NAME, GROUP_CONCAT(SUBMITEE_ID) AS GC_SI \
    FROM TASK, PARTICIPATES_IN)
    SELECT SN.NAME, SN_COUNT, SUM_TTN
    FROM SN, TTN`
    // files per each ORGDT & (count tuples in passed TDT related to ORGDT)
    var org_count_file_tuple = 
    `WITH SN
    AS
    (SELECT ODT.ID, COUNT(SERIAL_NUM) AS SN_COUNT \
    FROM ORIGINAL_DATA_TYPE AS ODT, ORIGINAL_DATA_SEQUENCE_FILE \
    WHERE ORIG_DATA_TYPE_ID=ODT.ID),
    TTN
    AS
    (SELECT ODT.ID, SUM(TOTAL_TUPLE_NUM) AS SUM_TTN \
    FROM ORIGINAL_DATA_TYPE AS ODT, PARSING_DATA_SEQUENCE_FILE \
    WHERE ORIGINAL_DATA_TYPE_ID=ODT.ID AND STORE_CONDITION="P") \
    SELECT SN.ID, SN_COUNT, SUM_TTN \
    FROM SN, TTN`
    // check submitees for each task
    var sub_each_task = 
    `SELECT SUBMITEE_ID \
    FROM PARTICIPATES_IN \
    WHERE APPROVED=1 AND TASK_NAME=?`
    // check task for each submitee
    var task_each_sub = 
    `SELECT GROUP_CONCAT(TASK_NAME) AS TN_LIST \
    FROM PARTICIPATES_IN \
    WHERE APPROVED=1 AND SUBMITEE_ID=?`

    mariadb.query(task_count_file_tuple, function(err1, rows1, fields1){
        if(!err1){
            response.success = true;
            for(i=0; i < rows1.length; i++){
                tmp_task_shape = by_task_shape
                tmp_task_shape.task_name = rows1[i].NAME
                tmp_task_shape.count_file = rows1[i].SN_COUNT
                tmp_task_shape.tuple_count = rows1[i].SUM_TTN
                variables = [rows1[i].NAME]
                mariadb.query(sub_each_task, variables, function(err2, rows2, fields2){
                    for(j=0; j < rows2.length; j++){
                        sub_task_json.sub_id = rows2[j].SUBMITEE_ID
                        mariadb.query(sub_each_task, variables, function(err3, rows3, fields3){
                            sub_task_json.participate_task = rows3[0].TN_LIST
                        })
                        tmp_task_shape.submitees.push(sub_task_json)
                    }
                })
            }
        } else {
            response.message = "서버 오류입니다. 문제가 계속되는 경우 관리자에게 문의하세요."
        }
    })
})
module.exports = router;
