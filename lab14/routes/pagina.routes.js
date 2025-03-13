//Importación de Express y creación de enrutador

const express = require('express');
const router = express.Router(); //Nos permite definir rutas en archivos separados y luego 
                                 //importarlas en server.js
const fs = require('fs'); //Importación de modulo fs para guardar datos en un archivo

//Definimos en donde esta nuestro controlador
const controlador = require('../controllers/controller.js');

//Middleware para verificar autenticación
function verificarSesion(req, res, next) {
    if (!req.session.user) { //Si no esta logeado
        return res.redirect('/login'); //Redirige a login
    }
    next(); //Si hay sesión continua con el siguiente middleware
}

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

//Ruta para ver mensajes
//Para añadir proteccion a la pagina si no se esta logeado se redirigira a la pagina de log

// Ruta protegida para ver mensajes
router.get('/mensajes', verificarSesion, controlador.obtenerMensajes);

module.exports = router;