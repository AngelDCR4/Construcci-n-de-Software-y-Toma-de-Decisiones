const db = require('../util/database'); //Importar la conexión a la BD

module.exports = class Mensaje {
    constructor(nombre, contenido, archivo) {
        this.nombre = nombre;
        this.contenido = contenido;
        this.archivo = archivo;
    }

    //Guardar mensaje en base de datos
    save() {
        //Inserta los datos en la BD y no acepta inyecciones
        return db.execute('INSERT INTO mensajes (nombre, contenido, archivo) VALUES (?, ?, ?)',
                         [this.nombre, this.contenido, this.archivo]);
    }

    
    //Obtener todos los mensajes de la BD
    static fetchAll() {
        return db.execute('SELECT * FROM mensajes');
    }
};
