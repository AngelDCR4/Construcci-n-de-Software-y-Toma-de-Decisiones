const db = require('../util/database'); //Definir donde esta la BD
const bcrypt = require('bcryptjs');

module.exports = class Usuario {
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }

//Guardar usuario en BD con contraseña Hasheada
    async save() {
        //Aplicamos 12 veces un hash a la contraseña (recomendado) 
        const hashedPassword = await bcrypt.hash(this.password, 12);
        //Insertamos el usuario y la contraseña hasheada en BD
        return db.execute(
            'INSERT INTO usuarios (username, password) VALUES (?, ?)',
            [this.username, hashedPassword]
        );
    }
//Metodo estatico para buscar un usuario por su nombre de usuario
    static findByUsername(username) {
        return db.execute('SELECT * FROM usuarios WHERE username = ?', [username]);
    }

//Agregar método para obtener los roles y permisos de cierto usuario
    //Metodo estatico y asincrono para la consulta
    static async getRolesAndPermissions(userId) {
        return db.execute( //Definición de consulta
            `SELECT r.nombre as rol, p.nombre as permiso 
             FROM usuario_roles ur
             JOIN roles r ON ur.rol_id = r.id
             JOIN rol_permisos rp ON r.id = rp.rol_id
             JOIN permisos p ON rp.permiso_id = p.id
             WHERE ur.usuario_id = ?`, //Filtra por el ID del usuario
             [userId] //ID que usa la consulta
        )
    }
};