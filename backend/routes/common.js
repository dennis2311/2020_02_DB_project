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
        success : false,
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
    const user = req.body.user

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
        if(user.birthdate===''){
            mariadb.query(`INSERT INTO ACCOUNT (ID, PASSWORD, NAME, GENDER, ADDRESS, PHONE, ROLE) VALUES (\'${user.id}\', \'${user.password}\', \'${user.name}\',\'${user.gender}\',\'${user.address}\', \'${user.phone}\', \'${user.role}\')`, function(err, rows, fields){
                if(!err){
                    response.success = true
                    response.message = '계정 생성이 완료되었습니다. 메인 화면으로 돌아갑니다.';
                    res.json(response);
                } else {
                    console.log(err)
                    response.message = "서버 오류입니다. 문제가 계속되는 경우 관리자에게 문의하시기 바랍니다.";
                    res.json(response);
                }
            })
        } else{
            mariadb.query(`INSERT INTO ACCOUNT (ID, PASSWORD, NAME, BIRTHDATE, GENDER, ADDRESS, PHONE, ROLE) VALUES (\'${user.id}\', \'${user.password}\', \'${user.name}\', \'${user.birthdate}\',\'${user.gender}\',\'${user.address}\', \'${user.phone}\', \'${user.role}\')`, function(err, rows, fields){
                if(!err){
                    response.success = true
                    response.message = '계정 생성이 완료되었습니다. 메인 화면으로 돌아갑니다.';
                    res.json(response);
                } else {
                    console.log(err)
                    response.message = "서버 오류입니다. 문제가 계속되는 경우 관리자에게 문의하시기 바랍니다.";
                    res.json(response);
                }
            })
        }        
    }
})

router.post('/changepassword', function(req, res, next){
    const user = {
        'current_password': req.body.user.current_password,
        'new_password': req.body.user.new_password,
        'new_password_confirm': req.body.user.new_password_confirm,
        'id': req.body.user.id
    };

    var response = {
        success : false,
        message : ''
    }

    if(user.new_password !== user.new_password_confirm){
        response.message = "비밀번호 확인이 틀립니다. 확인 후 다시 시도해주세요.";
        res.json(response);
    } else {
        mariadb.query(`SELECT PASSWORD FROM ACCOUNT WHERE ID = \'${user.id}\'`, function(err, rows, fields){
            if(!err){
                if(rows.length != 0){
                    if(user.current_password === rows[0].PASSWORD){
                        mariadb.query(`UPDATE ACCOUNT SET PASSWORD = \'${user.new_password}\' WHERE ID = \'${user.id}\'`, function(err, rows, fields){
                            if(!err){
                                response.success = true;
                                response.message = '비밀번호가 성공적으로 변경되었습니다. 로그인 화면으로 돌아갑니다.';
                                res.json(response);
                            } else{
                                response.message = "서버 오류입니다. 문제가 계속되는 경우 관리자에게 문의하세요.";
                                res.json(response);
                            }
                        });
                    } else {
                        console.log(user.current_password);
                        console.log(rows[0].PASSWORD);
                        response.message = "비밀번호가 틀립니다. 확인 후 다시 시도해 주세요.";
                        res.json(response);
                    }
                } else {
                    response.message = "일치하는 아이디가 없습니다.";
                    res.json(response);
                }     
            } else {
                response.message = "서버 오류입니다. 문제가 계속되는 경우 관리자에게 문의하세요.";
                res.json(response);
            }
        });
    }
})

router.post('/signout', function(req, res, next){
    const user = req.body.user;

    var response = {
        success : false,
        message : ''
    }

    mariadb.query(`SELECT PASSWORD FROM ACCOUNT WHERE ID = \'${user.id}\'`, function(err, rows, fields){
        if(!err){
            if(rows[0].PASSWORD === user.password){
                mariadb.query(`DELETE FROM ACCOUNT WHERE ID = \'${user.id}\'`, function(err, rows, fields){
                    if(!err){
                        response.success = true
                        response.message = '회원 탈퇴가 완료 되었습니다. 메인 화면으로 돌아갑니다.'
                        res.json(response)
                    } else {
                        response.message = '서버 문제입니다. 문제가 계속되는 경우 관리자에게 문의하세요.'
                        res.json(response)
                    }
                })
                
            } else {
                response.message = '비밀번호가 일치하지 않습니다.'
                res.json(response)
            }
        } else {
            response.message = '서버 문제입니다. 문제가 계속되는 경우 관리자에게 문의하세요.'
            res.json(response)
        }
    })

})

router.post('/changeaccountinfo', function(req, res, next){
    const id = req.body.id;
    const user = {
        "id" : req.body.user.id,
        "name" : req.body.user.name,
        "birthdate" : req.body.user.birthdate,
        "gender" : req.body.user.gender,
        "address" : req.body.user.address,
        "phone" : req.body.user.phone,
    };
    const updating = req.body.updating;

    var response = {
        success : false,
        message : "",
        user : {
            "name" : req.body.user.name,
            "birthdate" : req.body.user.birthdate,
            "gender" : req.body.user.gender,
            "address" : req.body.user.address,
            "phone" : req.body.user.phone,
        }
    }
    console.log(user)

    if(updating == true){
        if (user.name===''){
            response.message = '이름은 필수 항목입니다.';
            res.json(response);
        }
        else {
            var new_sql = `UPDATE ACCOUNT SET NAME=?, BIRTHDATE=?, \
            GENDER=?, ADDRESS=?, PHONE=? WHERE ID=?`
            variables = [user.name, user.birthdate, user.gender, user.address, user.phone, id]
            mariadb.query(new_sql, variables)
        }
    }

    mariadb.query(`SELECT NAME, BIRTHDATE, GENDER, ADDRESS,\
    PHONE FROM ACCOUNT WHERE ID=\'${id}\'`, function(err, rows, fields){
        if(!err){
            response.success = true
            response.user.name = rows[0].NAME
            response.user.birthdate = rows[0].BIRTHDATE
            response.user.gender = rows[0].GENDER
            response.user.address = rows[0].ADDRESS
            response.user.phone = rows[0].PHONE
            res.json(response)
        } else {
            response.message = '서버 문제입니다. 문제가 계속되는 경우 관리자에게 문의하세요.'
            res.json(response)
        }
    })
})
module.exports = router;