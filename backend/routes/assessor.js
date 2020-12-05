var express = require('express');
var router = express.Router();
var mariadb = require('../mariadb');

//testing git branch, add, commit, push
//add code to complete project

router.get('/', function(req, res, next) {
});

router.get('/parsingevaluate', function(req, res, next){
 
    mariadb.query(`SELECT F.ID, ORIGINAL_DATA_TYPE_ID, TASK_NAME, TOTAL_TUPLE_NUM, NULL_RATIO, DUPLICATE_TUPLE_NUM FROM PARSING_DATA_SEQUENCE_FILE AS F, ACCOUNT AS A WHERE  A.ID = F.ASSESSOR_ID AND F.EVALUATION_STATE = 0`, function(err, rows, fields){
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
    var selected_score = parseInt(params.selected_score);
    var pass_grade;

    var response = {
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