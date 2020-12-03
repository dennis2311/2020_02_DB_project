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

module.exports = router;