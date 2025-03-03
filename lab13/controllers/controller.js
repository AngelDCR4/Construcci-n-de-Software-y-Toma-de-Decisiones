//Separamos la funcion de nuestra ruta y la colocalmos en el controlador
exports.faq = (req, res) => {
    res.render('faq', { titulo: 'Preguntas Frecuentes' });
};


//Metodo post dentro de controlador
exports.formulario = (req, res) => {
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
};