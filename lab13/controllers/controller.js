//Separamos la funcion de nuestra ruta y la colocalmos en el controlador
exports.faq = (req, res) => {
    res.render('faq', { titulo: 'Preguntas Frecuentes' });
};

exports.services = (req, res) => {
    res.render('services', { titulo: 'Nuestros Servicios' });
};

exports.about = (req, res) => {
    res.render('about', { titulo: 'Acerca de Nosotros' });
}

exports.main = (req, res) => {
    //Manejar peticion get cuando usuario visita /
    //res.render() busca archivos en la carpeta views/ (index.ejs)
    res.render('index', {mensaje: 'Bienvenido a mi sitio dinámico!'}); //renderiza vista index.ejs y pasa variable mensaje
};

exports.contacto = (req, res) => {
    res.render('contact', {titulo: 'Contacto'});
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