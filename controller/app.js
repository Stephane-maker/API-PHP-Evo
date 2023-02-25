
const connection = require("../middelware/connection_mysql");

exports.AllPostOfFriend = (req, res, next) => {
    connection.query('SELECT u.id AS idUser, u.name, u.last_name, a.id_user AS userIdForFriend, a.id_demander AS friendOfUser FROM user u, amis a WHERE u.id = 21  AND a.id_user;', (error, results) => {
        for (let i = 0; i < results.length; i++) {
            const element = results[i];
            if (element.friendOfUser != '' || element.friendOfUser != undefined || element.friendOfUser != null) {
                connection.query('SELECT u.name, u.last_name, p.id_poster, p.post FROM user u, post p WHERE u.id = ' + element.friendOfUser + ' AND p.id_poster = ' + element.friendOfUser , (err , results) => {
                    if (err) { return res.status(404).json({message: 'Internal error server'});  }
                    else { return res.status(200).json(results); }
                });
            }else { return res.status(200).json({message: 'Aucun post pour le moment'}); }
        }
    });
}
exports.postProfil = (req, res, next) => {
    const id = req.params.id;
    connection.query(`SELECT * FROM user u, post p WHERE u.id = ${id} AND p.id_poster = ${id};`, (err, results) => {
        if (err) { return res.status(404).json({message: 'Internal Error Server'}); }
        else { return res.status(200).json(results); }
    })
};
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