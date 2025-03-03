const express = require('express');
const router = express.Router();

//Definimos donde esta el archivo de controlador
//CORREGIR RUTA ---------------------------------- ERROR
const controlador = require('../controllers/controller.js');

//PAGINA ACERCA DE
router.get('/about', controlador.about);

//PAGINA DE SERVICIOS
router.get('/services', controlador.services);

//PAGINA DE PREGUNTAS FRECUENTES
//En este caso separamos la función para solo colocar la ruta
router.get('/faq', controlador.faq);
/*
Podemos asignar el mismo código para que use una misma logica
pero se puede modificar el nombre de la ruta
*/
router.get('/faqesp', controlador.faq);

module.exports = router;