const express = require('express');

const router = express.Router();
const controllerApp = require('../controller/app');
const token = require('../middelware/auth_user')

router.get('/' , controllerApp.AllPostOfFriend); 
router.get('/profil/:id' , token, controllerApp.postProfil); 
router.post('/addPost', token, controllerApp.createPost);
router.put('/modifPost', controllerApp.ModifyPost);
router.delete('/:id' , controllerApp.deletePost);
router.get('/conversation', token, controllerApp.conversationUser);
router.get('/friend/:id', token, controllerApp.getFriendUser);

module.exports = router;