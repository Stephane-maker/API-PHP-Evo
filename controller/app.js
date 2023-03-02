
const connection = require("../middelware/connection_mysql");
const generateUniqueId = require('generate-unique-id');

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
    connection.query(`SELECT * FROM user u, post p WHERE u.id = ${req.auth.userId} AND p.id_poster = ${req.auth.userId};`, (err, results) => {
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
exports.conversationUser = (req, res, next) => {
    idUser = req.auth.userId;
    // const id = generateUniqueId({
    //     length: 32,
    //     useLetters: false
    //     });
    $Sql = `SELECT * FROM conversation WHERE membre_1  = ${idUser} OR membre_2 = ${idUser} AND uuid = uuid`;
    connection.query($Sql, (error, results) => {

        var cache = {};
        resWithNoDoublon = results.filter(function(elem,index,array){
            return cache[elem.uuid]?0:cache[elem.uuid]=1;
        });
        console.log(resWithNoDoublon)
        if (error) return res.status(404).json({error: `An error as been occured : ${error}` });
        else return res.status(200).json(resWithNoDoublon);
    })
}
exports.getFriendUser = (req, res, next) => {
    id = req.auth.userId;
    $Sql = `SELECT * FROM amis a, user u WHERE a.id_user = ${id} AND a.id_demander = u.id`;
    connection.query($Sql, (error, results)=> {
        
        if (error) return res.status(404).json({error: `An error as been occured : ${error}` });
        else return res.status(200).json(results);
    })
}