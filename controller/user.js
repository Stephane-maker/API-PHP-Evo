const mysql = require("mysql");
const Jwt = require('jsonwebtoken');
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
        console.log("Couldn't connect : to Mysql server" );
    }
});

exports.signUp = (req, res, next) => {
    console.log(req.body)
    const password = JSON.stringify(req.body.password);
    const name = JSON.stringify(req.body.name);
    const last_name = JSON.stringify(req.body.last_name);
    const email = JSON.stringify(req.body.email);
    const sql = `INSERT INTO user(password, name, last_name,email) VALUES (${password}, ${name}, ${last_name}, ${email}) `;
    connection.query(sql, (error, result) => {

        if (error) return res.status(500).json({error: error});
        else res.status(200).json({ message: 'Data added successfully.' });
    });
}

exports.signIn = (req , res , next) => {

    let $email = JSON.stringify(req.body.email);
    let $password = JSON.stringify(req.body.password);
    let $Sql = `SELECT * FROM user WHERE email = ${$email}`;
    connection.query($Sql, function (err, data){
        if (data.length == 0) { return res.status(401).json({message: "Utilisateur inconnue"})}
        if (err) { return res.status(err).json({err: "Errer Inconnue"}) }
        for (let i = 0; i < data.length; i++) {
            const element = data[i];
            if (JSON.stringify(element.email) ==  $email && JSON.stringify(element.password) == $password) {
                return res.status(200).json({
                    message: "You are connected",
                    token: Jwt.sign({ id:  element.id },
                        "RANDOM_TOKEN_SECRET", { expiresIn: "24h" })
                    })
            }else{
                return res.status(401).json({err: "l'un de vos identifiant ne correspond pas"});
            }
        }
    })
}