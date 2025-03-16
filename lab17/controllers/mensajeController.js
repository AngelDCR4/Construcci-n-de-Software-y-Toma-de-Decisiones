const Mensaje = require("../models/mensaje");

//Muestra el formulario de contacto
exports.contacto = (req, res) => {
    res.render('contact', { titulo: 'Contacto' });
};

//Maneja el formulario y guarda en la BD
exports.formulario = async (req, res) => {
    const { nombre, mensaje } = req.body; //Extrae datos del form
    
    try {
        const nuevoMensaje = new Mensaje(nombre, mensaje); //Crea una instancia en modelo Mensaje
        await nuevoMensaje.save(); //Guardar mensaje en la BD
        res.redirect('/mensajes');
    } catch (error) {
        console.error("Error al guardar el mensaje:", error); //Despliega error
        res.status(500).send("Error al guardar el mensaje.");//Envia error 500
    }
};

//Obtiene todos los mensajes de la BD
exports.obtenerMensajes = async (req, res) => {
    try {
        const [mensajes] = await Mensaje.fetchAll(); //Obtener todos los mensajes
        res.render('mensajes', { titulo: 'Mensajes Recibidos', mensajes });
    } catch (error) {
        console.error("Error al obtener mensajes:", error);
        res.status(500).send("Error al obtener mensajes.");
    }
};
