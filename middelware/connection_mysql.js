
const mysql = require("mysql");
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '753159852456',
    database: 'evo',
});

connection.connect(function(err, connection){
    if (connection) {
        console.log("Connected at Mysql Server");
    }else{
        console.log("Couldn't connect : to Mysql server");
    }
});
module.exports = connection;