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
        mariadb.query(`INSERT INTO TASK (NAME, TASK_DESCRIPTION, MIN_UPLOAD_PERIOD, TASK_TABLE_NAME, TASK_TABLE_SCHEMA_INFO,ADMIN_ID) \
        VALUES (\'${user.taskName}\', \'${user.taskDescription}\', \'${user.min_upload_period}\',\'${user.taskTableName}\',\'${user.taskTableSchemaInfo}\', \
        'admin')`, function(err,rows, fields){
                const attr = user.taskTableSchemaInfo.split(' ')
                var tableName = user.taskTableName
                mariadb.query(`CREATE TABLE ?? (ID INT AUTO_INCREMENT PRIMARY KEY, TASK_NAME VARCHAR(30), SUBMITTEE_NAME VARCHAR(30),DATA_TYPE_FLAG VARCHAR(30))`, [tableName], function(err,rows, fields){
                    if(!err){
                        for(var i=0;i<attr.length;i++){
                            var temp = attr[i].split(',')
                            mariadb.query(``, function(err,rows, fields){
                                if(!err && i==attr.length-1){
                                    response.success = true
                                    response.message = '테스크 생성이 완료되었습니다. 오리지널 데이터 타입 생성 페이지로 이동합니다.';
                                    res.json(response);
                                } else {
                                    console.log(err)
                                    response.message = "서버 오류입니다. 문제가 계속되는 경우 관리자에게 문의하시기 바랍니다.";
                                    res.json(response);
                                }
                            });
                        }
                    } else {
                        console.log(err)
                        response.message = "서버 오류입니다. 문제가 계속되는 경우 관리자에게 문의하시기 바랍니다.";
                        res.json(response);
                    }
                });
        });
    }
});

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

router.get('/membermanage_taskname', function(req, res, next) {    
    mariadb.query(`SELECT NAME FROM TASK;`, function(err, rows, fields){
        if(!err){
            res.send(JSON.stringify(rows))
        } else {
            res.send(false)
        }
    });
})

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

router.get('/membermanage/:id/:taskname', function(req, res, next){
    
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
router.get('/taskstatistics', function(req, res, next){
    var response = {
        task_names : [],
        orgdt_ids : [],
        sub_ids : [],
        success : false,
        message : "",
    }

    mariadb.query("SELECT DISTINCT(NAME) FROM TASK", function(err, rows, fields){
        if(!err){
            response.success = true
            for(var i=0; i < rows.length; i++){
                response.task_names.push(rows[i].NAME)
            }
            mariadb.query("SELECT DISTINCT(ID) FROM ORIGINAL_DATA_TYPE", function(err, rows, fields){
                for(var j=0; j< rows.length; j++){
                    response.orgdt_ids.push(rows[j].ID)
                }
                mariadb.query("SELECT DISTINCT(SUBMITEE_ID) FROM PARTICIPATES_IN WHERE APPROVED=1", function(err, rows, fields){
                    for(var k=0; k< rows.length; k++){
                        response.sub_ids.push(rows[k].SUBMITEE_ID)
                    }
                    res.send(response)
                })
            })
        } else {
            res.send(response)
        }
    })
})

router.post('/taskstatistics_click', function(req, res, next){
    const req_case = req.body.req_case
    const task_file_num = req.body.task_file_num //TASK NAME(STRING)
    const task_count_tuple = req.body.task_count_tuple //TASK NAME(STRING)
    const orgdt_file_num = req.body.orgdt_file_num //ORGDT ID(STRING)
    const orgdt_count_tuple = req.body.orgdt_count_tuple //ORGDT ID(STRING)
    const sub_per_task = req.body.sub_per_task //TASK NAME(STRING)
    const task_per_sub = req.body.task_per_sub //SUB ID(STRING)

    var response = {
        message : "서버 오류입니다. 문제가 계속되는 경우 관리자에게 문의하세요.",
    }

    var qry = ""
    var variable = []
    if (req_case == 1){
        // num of file for task
        qry = "SELECT COUNT(SERIAL_NUM) AS SN_COUNT \
        FROM ORIGINAL_DATA_TYPE AS ODT, ORIGINAL_DATA_SEQUENCE_FILE \
        WHERE ORIG_DATA_TYPE_ID=ODT.ID AND TASK_NAME=?"
        variable = [task_file_num]
        mariadb.query(qry, variable, function(err, rows, feilds){
            response.message = rows[0].SN_COUNT
            if(response.message == null){
                response.message = 0
            }
            res.send(response)
        })
    } else if (req_case == 2){
        // passed & saved number of tuple for task
        qry = `SELECT SUM(TOTAL_TUPLE_NUM) AS SUM_TTN \
        FROM PARSING_DATA_SEQUENCE_FILE \
        WHERE TASK_NAME=? AND STORE_CONDITION="P"`
        variable = [task_count_tuple]
        mariadb.query(qry, variable, function(err, rows, feilds){
            response.message = rows[0].SUM_TTN
            if(response.message == null){
                response.message = 0
            }
            res.send(response)
        })
    } else if (req_case == 3){
        // num of file for ORGDT
        qry = `SELECT COUNT(SERIAL_NUM) AS SN_COUNT \
        FROM ORIGINAL_DATA_SEQUENCE_FILE \
        WHERE ORIG_DATA_TYPE_ID=?`
        variable = [orgdt_file_num]
        mariadb.query(qry, variable, function(err, rows, feilds){
            response.message = rows[0].SN_COUNT
            if(response.message == null){
                response.message = 0
            }
            res.send(response)
        })
    } else if (req_case == 4){
        // passed & saved number of tuple for ORDGT
        qry = `SELECT SUM(TOTAL_TUPLE_NUM) AS SUM_TTN \
        FROM PARSING_DATA_SEQUENCE_FILE \
        WHERE ORIGINAL_DATA_TYPE_ID=? AND STORE_CONDITION="P"`
        variable = [orgdt_count_tuple]
        mariadb.query(qry, variable, function(err, rows, feilds){
            response.message = rows[0].SUM_TTN
            if(response.message == null){
                response.message = 0
            }
            res.send(response)
        })
    } else if (req_case == 5){
        // submitee per task
        qry = `SELECT GROUP_CONCAT(SUBMITEE_ID) AS GC_SI \
        FROM PARTICIPATES_IN WHERE TASK_NAME=? AND APPROVED=1`
        variable = [sub_per_task]
        mariadb.query(qry, variable, function(err, rows, feilds){
            response.message = rows[0].GC_SI
            if(response.message == null){
                response.message = "참여 제출자 없음"
            }
            res.send(response)
        })
    } else if (req_case == 6){
        // task per submitee
        qry = `SELECT GROUP_CONCAT(TASK_NAME) AS GC_TN \
        FROM PARTICIPATES_IN WHERE SUBMITEE_ID=? AND APPROVED=1`
        variable = [task_per_sub]
        mariadb.query(qry, variable, function(err, rows, feilds){
            response.message = rows[0].GC_TN
            if(response.message == null){
                response.message = "참여 태스크 없음"
            }
            res.send(response)
        })
    }
})
module.exports = router;
