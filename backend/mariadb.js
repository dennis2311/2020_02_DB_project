var mysql = require('mysql');

var connection = mysql.createConnection({
    host:"dbproject.chcowaxyuzip.ap-northeast-2.rds.amazonaws.com",
    user:"admin",
    password:"administrator",
    database:"dbproject"
});

module.exports = connection;