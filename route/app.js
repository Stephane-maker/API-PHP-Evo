const express = require('express');

const router = express.Router();
const controllerApp = require('../controller/app');
const token = require('../middelware/auth_user')

router.get('/' ,  controllerApp.AllPost); 


module.exports = router;