//Importación de Express y creación de enrutador

const express = require('express');
const router = express.Router(); //Nos permite definir rutas en archivos separados y luego 
                                 //importarlas en server.js
const fs = require('fs'); //Importación de modulo fs para guardar datos en un archivo

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

//Ruta para manejar el formulario de contacto
//'/submit-contact' sera la dirección posterior cuando se envie el formulario
router.post('/submit-contact', (req, res) => {
    const {nombre, mensaje} = req.body //Extracción de datos en formulario

    //Formato del mensaje
    const data = `Nombre: ${nombre}\nMensaje: ${mensaje}\n---\n`;

    //Guardar en un archivo txt - El archivo se crea solito
    fs.appendFile('mensaje.txt', data, (err) => {
        if (err) {
            console.error(err);
            return res.send("Error al guadar el mensaje");
        }
        res.send("Mensaje recibido. ¡Gracias por contactarnos :D!");
    });
});

//Exportación de router para usarlo en server.js
module.exports = router; //Permite que server.js pueda importar y usar las rutas definidas aquí

//Importar routes/main.js en server.js
