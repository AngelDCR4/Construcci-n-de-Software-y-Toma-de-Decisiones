//Importación de Express y creación de enrutador

const express = require('express');
const router = express.Router(); //Nos permite definir rutas en archivos separados y luego 
                                 //importarlas en server.js

//PAGINA PRINCIPAL
//Definir ruta para página principal (/)
router.get('/', (req, res) => {
    //Manejar peticion get cuando usuario visita /
    //res.render() busca archivos en la carpeta views/ (index.ejs)
    res.render('index', {mensaje: 'Bienvenido a mi sitio dinámico!'}); //renderiza vista index.ejs y pasa variable mensaje
});

//PAGINA CONTACTO
router.get('/contact', (req, res) => {
    res.render('contact', {titulo: 'Contacto'});
});

//Exportación de router para usarlo en server.js
module.exports = router; //Permite que server.js pueda importar y usar las rutas definidas aquí

//Importar routes/main.js en server.js
