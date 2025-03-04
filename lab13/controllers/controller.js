const Mensaje = require("../models/mensaje");

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

    const nuevoMensaje = new Mensaje(nombre,mensaje);
    nuevoMensaje.save(); //Guardar mensaje usando el modelo

    res.redirect('/mensajes');
};

exports.obtenerMensajes = (req, res) => {
    Mensaje.fetchAll((mensajes) => {
        res.render('mensajes', {titulo: 'Mensajes Recibidos', mensajes});
    });
};