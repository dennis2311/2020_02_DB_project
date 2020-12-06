var express = require('express');
var router = express.Router();
var mariadb = require('../mariadb');

//testing git branch, add, commit, push
//add code to complete project

router.get('/', function(req, res, next) {
});

router.get('/parsingevaluate/:userid', function(req, res, next){
 
    const userid = req.params.userid

    mariadb.query(`SELECT P.ID, O.NAME, P.TASK_NAME, P.TOTAL_TUPLE_NUM, P.NULL_RATIO, P.DUPLICATE_TUPLE_NUM FROM PARSING_DATA_SEQUENCE_FILE AS P, ORIGINAL_DATA_TYPE AS O WHERE P.ASSESSOR_ID = \'${userid}\' AND P.EVALUATION_STATE = 0 AND P.ORIGINAL_DATA_TYPE_ID = O.ID`, function(err, rows, fields){
        if(!err){
            res.send(JSON.stringify(rows))
        } else {
            res.send(false)
        }
    });

});

router.get('/monitorhistory', function(req, res, next){

    mariadb.query(`SELECT * FROM PARSING_DATA_SEQUENCE_FILE F`, function(err,rows,fields){
        if(!err){
            res.send(JSON.stringify(rows))
        } else {
            res.send(false)
        }
    });
});

router.post('/parsingevaluate', function(req, res, next){
    const params = req.body.params;
    console.log(params)
    let selected_score = parseInt(params.selected_score);
    let pass_grade;
    let task_table_name;
    let schema_info;
    let ODT_id = parseInt(params.original_data_type_id);
    let num_question_symbol;
    let questions="?";
    let submittee_id;
    let file_id = String(params.fileid)
    let file_name;
    let response = {
        success : false,
        message : ''
    }
    
    mariadb.query(`SELECT MAX(PASS_GRADE) AS PASS_GRADE FROM TASK WHERE NAME = \'${params.taskname}\'`, function(err, rows, fields){
        if(!err){
            if(rows[0].PASS_GRADE == null){
                // empty table
                res.send(false)
            }
            else{
                pass_grade = rows[0].PASS_GRADE
                if(selected_score >= pass_grade){
        
                    mariadb.query(`UPDATE PARSING_DATA_SEQUENCE_FILE SET EVALUATION_STATE = 1, STORE_CONDITION = 'P', DATA_QUALITY_GRADE = \'${selected_score}\' WHERE ID = \'${params.fileid}\'`,function(err, rows, fields){
                        if(!err){
                            response.success = true
                            response.message = 'Parsing data sequence file 정성평가 결과 PASS 되었습니다.';
                            // get TASK_DATA_TABLE NAME
                            mariadb.query(`SELECT TASK_TABLE_NAME FROM TASK WHERE NAME =  \'${params.taskname}\'`, function(err, rows, fields){
                                if(!err){
                                    task_table_name = rows[0].TASK_TABLE_NAME
                                    // get schema info of the corresponding original data type
                                    mariadb.query(`SELECT SCHEMA_INFO FROM ORIGINAL_DATA_TYPE WHERE ID = \'${ODT_id}\'`, function(err, rows, fields){
                                        if(!err){
                                            console.log(rows)
                                            schema_info = rows[0].SCHEMA_INFO
                                            console.log(schema_info)
                                            num_question_symbol = (schema_info.match(/,/g) || []).length;
                                            console.log(num_question_symbol)
                                            for(var i=1; i<=num_question_symbol; i++){
                                                questions = questions + ", ?";
                                            }
                                            console.log(questions)
                                            // get primitive rows from PARSED_DATA_SEQUENCE_FILE itself.
                                            mariadb.query(`SELECT SUBMITTEE_ID FROM PARSING_DATA_SEQUENCE_FILE WHERE ID = ${file_id}`, function(err, rows, fields){
                                                if(!err){
                                                    console.log(rows)
                                                    submittee_id = rows[0].SUBMITTEE_ID
                                                    console.log(submittee_id)
                                                    file_name = "PARSED_FILE" + file_id
                                                    mariadb.query(`SELECT ${schema_info} FROM ${file_name}`, function(err, rows, fields){
                                                        if(!err){
                                                            console.log(rows)
                                                            let temp_str = ""
                                                            let userRow;
                                                            let len;
                                                            for(var i=0; i<rows.length; i++){
                                                                console.log(rows[i])
                                                                userRow = JSON.parse(JSON.stringify(rows[i])); 
                                                                console.log(userRow)
                                                                len = Object.keys(userRow).length
                                                                temp_str = Object.values(userRow)[0]
                                                                for(var j=1; j<len; j++){
                                                                    temp_str = temp_str + ", " + Object.values(userRow)[j]
                                                                }
                                                                console.log(temp_str)
                                                                
                                                                
                                                                // INSERT to the corresponding TABLE_DATA_TABLE
                                                                mariadb.query(`INSERT INTO ${task_table_name} (TASK_NAME, SUBMITTEE_NAME, DATA_TYPE_FLAG, ${schema_info}) VALUES (?, ?, ?, \'${questions}\')`, [params.taskname, submittee_id, ODT_id, temp_str], function(err, rows, fields){
                                                                    if(!err){
                                                                        response.message = 'Parsing data sequence file 정성평가 결과 PASS 되었습니다.';
                                                                    }else{
                                                                        console.log(err)
                                                                    }
                                                                });
                                                            }
                                                        }
                                                        else{
                                                           console.log(err)
                                                        }
                                                    });
                                                }else{
                                                    console.log(err)
                                                }
                                            });
                                        }
                                    });
                                }
                                else{
                                    res.send(false)
                                }
                            });
                            res.json(response)
                        } else {
                            response.message = "서버 오류입니다. 문제가 계속되는 경우 관리자에게 문의하세요.";
                            console.log(response)
                            console.log(err)
                            res.json(response)
                        }
                    });
                    
                }else{
                    mariadb.query(`UPDATE PARSING_DATA_SEQUENCE_FILE SET EVALUATION_STATE = 1, DATA_QUALITY_GRADE = \'${selected_score}\' WHERE ID = \'${params.fileid}\'`,function(err, rows, fields){
                        if(!err){
                            response.success = true
                            response.message = 'Parsing data sequence file 정성평가 결과 NON-PASS 되었습니다.';
                            res.json(response)
                        } else {
                            response.message = "서버 오류입니다. 문제가 계속되는 경우 관리자에게 문의하세요.";
                            console.log(response)
                            console.log(err)
                            res.json(response)
                        }
                    });
                }
            }   
        } else {
            res.send(false)
        }
    });
    /*
    if(selected_score >= pass_grade){
        
        mariadb.query(`INSERT INTO PARSING_DATA_SEQUENCE_FILE (EVALUATION_STATE, STORED_CONDITION, DATA_QUALITY_GRADE) VALUES (?, ?, ?) WHERE ID = \'${parmas.fileid}\'`,[1,'P',params.selected_score] ,function(err, rows, fields){
            if(!err){
                response.success = true
                response.message = 'Parsing data sequence file 정성평가 결과 PASS 되었습니다.';
                res.json(response)
            } else {
                response.message = "서버 오류입니다. 문제가 계속되는 경우 관리자에게 문의하세요.";
                res.json(response)
            }
        });
        
    }else{
        mariadb.query(`INSERT INTO PARSING_DATA_SEQUENCE_FILE (EVALUATION_STATE, DATA_QUALITY_GRADE) VALUES (?, ?) WHERE ID = \'${parmas.fileid}\'`,[1, params.selected_score] ,function(err, rows, fields){
            if(!err){
                response.success = true
                response.message = 'Parsing data sequence file 정성평가 결과 NON-PASS 되었습니다.';
                res.json(response)
            } else {
                response.message = "서버 오류입니다. 문제가 계속되는 경우 관리자에게 문의하세요.";
                res.json(response)
            }
        });
    }
    */
    
})

module.exports = router;