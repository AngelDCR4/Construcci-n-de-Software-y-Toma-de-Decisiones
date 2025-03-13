const express = require('express');
const router = express.Router();

//Definición de donde esta el controlador de user
const user_controller = require('../controllers/user.controller.js');

router.get('/get_login', user_controller.get_login);

module.exports = router;