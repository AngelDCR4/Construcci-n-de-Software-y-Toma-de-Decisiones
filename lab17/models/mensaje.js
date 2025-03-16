const db = require('../util/database'); //Importar la conexión a la BD

module.exports = class Mensaje {
    constructor(nombre, contenido) {
        this.nombre = nombre;
        this.contenido = contenido;
    }

    //Guardar mensaje en base de datos
    save() {
        //Inserta los datos en la BD y no acepta inyecciones
        return db.execute('INSERT INTO mensajes (nombre, contenido) VALUES (?, ?)',
                         [this.nombre, this.contenido]);
    }

    
    //Obtener todos los mensajes de la BD
    static fetchAll() {
        return db.execute('SELECT * FROM mensajes');
    }
};
