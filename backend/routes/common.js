var express = require('express');
var router = express.Router();
var mariadb = require('../mariadb');

const role = function(req){
    if(req==='admin') return '관리자'
    if(req==='assessor') return '평가자'
    if(req==='submittee') return '제출자'
}

router.post('/', function(req, res, next){
    const user = req.body.user;

    var response = {
        success : false,
        role : '',
        message : ''
    }

    mariadb.query(`SELECT password, role FROM sample_account WHERE id = \'${user.id}\'`, function(err, rows, fields){
        if(!err){
            if(rows.length != 0){
                if(user.password === rows[0].password){
                    response.success = true;
                    response.role = rows[0].role;
                    response.message = `${role(response.role)} 계정으로 로그인 하였습니다.`;
                    res.json(response);
                } else {
                    response.message = "비밀번호가 틀립니다. 확인 후 다시 시도해 주세요.";
                    res.json(response)
                }
            } else {
                response.message = "일치하는 아이디가 없습니다.";
                res.json(response)
            }     
        } else {
            response.message = "서버 오류입니다. 문제가 계속되는 경우 관리자에게 문의하세요.";
            res.json(response);
        }
    });

})

router.post('/createaccount', function(req, res, next){
    const user = {
        'id' : req.body.user.id,
        'password': req.body.user.password,
        'password_confirm': req.body.user.password_confirm,
        'name': req.body.user.name,
        'birthdate':req.body.user.birthdate,
        'gender':req.body.user.gender,
        'address':req.body.user.address,
        'phone':req.body.user.phone,
        'role':req.body.user.role
    };

    var response = {
        success : false,
        message : ''
    }

    if (user.id===''){
        response.message = '아이디는 필수 항목입니다.';
        res.json(response);
    }
    else if (user.password===''|user.password_confirm===''){
        response.message = '비밀번호는 필수 항목입니다.';
        res.json(response);
    }
    else if (user.password != user.password_confirm){
        response.message = '두 비밀번호가 일치하지 않습니다. 다시 확인해주세요.';
        res.json(response);
    }
    else if (user.name===''){
        response.message = '이름은 필수 항목입니다.';
        res.json(response);
    }
    else if (user.role===''){
        response.message = '사용자 역할 선택은 필수 항목입니다.';
        res.json(response);
    }
    else{
        mariadb.query(`SELECT ID FROM ACCOUNT WHERE ID = \'${user.id}\'`, function(err, rows, fields){
            if(!err){
                if(rows.length != 0){
                    response.message = '이미 사용 중인 아이디입니다. 다른 아이디를 사용해주세요.';
                    res.json(response);
                }
            } else {
                response.message = "서버 오류입니다. 문제가 계속되는 경우 관리자에게 문의하세요.";
                res.json(response);
            }
        })

        mariadb.query(`INSERT INTO ACCOUNT VALUES (\'${user.id}\', \'${user.password}\', \'${user.name}\', \'${user.birthdate}\', \'${user.gender}\', \'${user.address}\', \'${user.phone}\', \'${user.role}\',)`, function(err, rows, fields){
            if(!err){
                response.success = true
                response.message = '계정 생성이 완료되었습니다. 메인 화면으로 돌아갑니다.';
                res.json(response);
            } else {
                response.message = "서버 오류입니다. 문제가 계속되는 경우 관리자에게 문의하세요.";
                res.json(response);
            }
        })
    }
})

router.get('/findaccount', function(req, res, next){
})

module.exports = router;