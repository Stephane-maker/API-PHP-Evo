const express = require('express');

const router = express.Router();
const controllerApp = require('../controller/app');
const token = require('../middelware/auth_user')

router.get('/' ,  controllerApp.AllPostOfFriend); 
router.get('/profil/:id' ,  controllerApp.postProfil); 
router.post('/addPost' , controllerApp.createPost);
router.put('/modifPost' , controllerApp.ModifyPost);
router.delete('/:id' , controllerApp.deletePost);

module.exports = router;