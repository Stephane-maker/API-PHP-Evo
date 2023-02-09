const express = require('express');

const router = express.Router();
const controllerUSer = require('../controller/user');

router.post('/signUp', controllerUSer.signUp); //s'inscrire
router.post('/signIn', controllerUSer.signIn); //se connecter

module.exports = router;