const fs = require('fs'); //Importación de modulo fs para trabajar con archivos

module.exports = class Mensaje {
    constructor(nombre, contenido) {
        this.nombre = nombre;
        this.contenido = contenido;
    }

    save() {
        const data = `Nombre: ${this.nombre}\nMensaje: ${this.contenido}\n---\n`; //formato de mensaje
        fs.appendFile('mensaje.txt',data, (err) => {
            if (err) {
                console.error('Error al guardar el mensaje', err);
            }
        });
    }

    //Método estatico para obtener todos los mensajes
    static fetchAll(callback) {
        fs.readFile('mensaje.txt', 'utf-8', (err, data) => { // Leer el archivo
            if (err || !data) {
                callback([]); // Si hay error o el archivo está vacío, devolvemos un array vacío
            } else {
                // Separa los mensajes con '---\n' y los almacena en un array
                const mensajes = data.split('---\n').filter(msg => msg.trim() !== '');
                callback(mensajes); // ¡Aquí estaba el error! Se debe pasar `mensajes` al callback
            }
        });
    }
};
