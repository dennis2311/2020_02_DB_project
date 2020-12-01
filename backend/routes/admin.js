var express = require('express');
var router = express.Router();
var mariadb = require('../mariadb');

router.get('/membermanage', function(req, res, next) {
    var response = {
        success : false,
        users : [],
        message : ''
    }

    var list = []
    
    mariadb.query(`SELECT ID, ROLE FROM ACCOUNT WHERE ROLE IN (\'ASE\', \'SUB\')`, function(err, rows, fields){
        if(!err){
            response.success = true
            res.send(JSON.stringify(rows))
        } else {
            response.message = "서버 오류입니다. 문제가 계속되는 경우 관리자에게 문의하세요.";
        }
    });
});

router.get('/membermanage/:id', function(req, res, next){
    console.log('params : '+req.params)
    console.log('path : '+req.path)
    console.log('query : '+req.query)
    res.send(['awesome user'])
})

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
    else{
                
    }
})

module.exports = router;