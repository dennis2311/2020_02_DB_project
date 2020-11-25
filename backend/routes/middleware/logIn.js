var mariadb = require('../../mariadb')

const role = function(req){
    if(req==='ADM') return '관리자'
    if(req==='ASE') return '평가자'
    if(req==='SUB') return '제출자'
}

var logIn = (user) => {
    console.log(`Here is middleware. User profile : ${user.id}, ${user.password}`)
    var response = {
        success : 'false',
        role : '',
        message : ''
    }

    mariadb.query(`SELECT PASSWORD, ROLE FROM ACCOUNT WHERE ID = \'${user.id}\'`, function(err, rows, fields){
        if(!err){
            console.log("not error")
            if(rows.length != 0){
                if(user.password === rows[0].PASSWORD){
                    response.success = true;
                    response.role = rows[0].ROLE;
                    response.message = `${role(response.role)} 계정으로 로그인 하였습니다.`;
                } else {
                    response.message = "비밀번호가 틀립니다. 확인 후 다시 시도해 주세요.";
                }
            } else {
                response.message = "일치하는 아이디가 없습니다.";
            }     
        } else {
            console.log("error")
            response.message = "서버 오류입니다. 문제가 계속되는 경우 관리자에게 문의하세요.";
        }
    });
    console.log(`Middleware returns : ${reponse.success}, ${repsonse.message}`)
    return response

}

module.exports = logIn;