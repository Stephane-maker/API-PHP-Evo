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
        console.log("Couldn't connect : to Mysql server" );
    }
});

exports.AllPost = (req, res, next) => {
    connection.query('SELECT * FROM post', (error, results) => {
        if (error) return res.status(500).json({error: "internal error"});
        else return res.status(200).json(results)
    });
}

exports.createPost = (req, res, next) => {
    const id_poster = JSON.stringify(req.body.id_poster);
    const post = JSON.stringify(req.body.post);
    const sql = `INSERT INTO post(id_poster, post) VALUES (${id_poster}, ${post})`;
    connection.query(sql, (error, results) => {
        if (error) return res.status(500).json({error: "internal error"});
        else return res.status(200).json({message: 'post added successfully'});
    });
}

exports.ModifyPost = (req, res, next) => {
    const id = JSON.stringify(req.body.id);
    const id_poster = JSON.stringify(req.body.id_poster);
    const post = JSON.stringify(req.body.post);
    const $sql = `UPDATE post SET post = ${post} WHERE id = ${id}`;
    connection.query($sql, (error, results) => {
        if (error) return res.status(404).json({error: "Vous n'etes pas autoriser a effectué cette action."});
        else return res.status(200).json({message: 'Post was updated successfully'});
    })
}

exports.deletePost = (req, res, next) => {
    const id = JSON.stringify(req.params.id);
    const id_poster = JSON.stringify(req.params.id_poster);
    const $sql = `DELETE FROM post WHERE id = ${id}`;
    connection.query($sql, (error, results) => {
        if (error) return res.status(404).json({error: `Vous n'etes pas authoriser a effectué cette action ${error}` });
        else return res.status(200).json({message : "post deleted"});
    })
}