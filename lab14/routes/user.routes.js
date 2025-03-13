const express = require('express');
const router = express.Router();

//Definición de donde esta el controlador de user
const user_controller = require('../controllers/user.controller.js');

router.get('/login', user_controller.get_login);
router.post('/login', user_controller.post_login);
router.get('/logout', user_controller.logout);


module.exports = router;