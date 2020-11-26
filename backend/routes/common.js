var express = require('express');
var router = express.Router();
var mariadb = require('../mariadb');

const role = function(req){
    if(req==='ADM') return '관리자'
    if(req==='ASE') return '평가자'
    if(req==='SUB') return '제출자'
}

router.post('/', function(req, res, next){
    const user = req.body.user;
    
    var response = {
        success : 'false',
        id : '',
        role : '',
        message : ''
    }

    mariadb.query(`SELECT PASSWORD, ROLE FROM ACCOUNT WHERE ID = \'${user.id}\'`, function(err, rows, fields){
        if(!err){
            if(rows.length != 0){
                if(user.password === rows[0].PASSWORD){
                    response.success = true;
                    response.id = user.id;
                    response.role = rows[0].ROLE;
                    response.message = `${role(response.role)} 계정으로 로그인 하였습니다.`;
                } else {
                    response.message = "비밀번호가 틀립니다. 확인 후 다시 시도해 주세요.";
                }
            } else {
                response.message = "일치하는 아이디가 없습니다.";
            }     
        } else {
            response.message = "서버 오류입니다. 문제가 계속되는 경우 관리자에게 문의하세요.";
        }
        res.json(response);
    });
})

router.post('/createaccount', function(req, res, next){
    const user = req.body.user;

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
    else if (user.password !== user.password_confirm){
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

        mariadb.query(`INSERT INTO ACCOUNT (ID, PASSWORD, NAME, ROLE) VALUES (\'${user.id}\', \'${user.password}\', \'${user.name}\', \'${user.role}\')`, function(err, rows, fields){
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

router.post('/changepassword', function(req, res, next){
    const user = {
        'current_password': req.body.user.current_password,
        'new_password': req.body.user.new_password,
        'new_password_confirm': req.body.user.new_password_confirm
    };

    var response = {
        success : false,
        role : '',
        message : ''
    }

    // 로그인 이후 id를 전달받지 않은 상태에서 mariadb 내에 유일하지 않은 pw만으로는 유저 지명할 수 없음
    mariadb.query(`SELECT PASSWORD, ROLE FROM ACCOUNT WHERE ID = \'${user.id}\'`, function(err, rows, fields){
        if(!err){
            if(rows.length != 0){
                if(user.current_password === rows[0].PASSWORD){
                    response.success = true;
                    // update account new_password through the id
                    res.json(response);
                } else {
                    console.log(user.current_password)
                    console.log(rows[0].PASSWORD)
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

module.exports = router;