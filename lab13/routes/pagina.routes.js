//Importación de Express y creación de enrutador

const express = require('express');
const router = express.Router(); //Nos permite definir rutas en archivos separados y luego 
                                 //importarlas en server.js
const fs = require('fs'); //Importación de modulo fs para guardar datos en un archivo

//Definimos en donde esta nuestro controlador
const controlador = require('../controllers/controller.js');

//PAGINA PRINCIPAL
//Definir ruta para página principal (/)
router.get('/', controlador.main);

//PAGINA CONTACTO
router.get('/contact', controlador.contacto);

//Ruta para manejar el formulario de contacto
//'/submit-contact' sera la dirección posterior cuando se envie el formulario
router.post('/submit-contact',controlador.formulario);

//Exportación de router para usarlo en server.js
module.exports = router; //Permite que server.js pueda importar y usar las rutas definidas aquí

//Importar routes/main.js en server.js
