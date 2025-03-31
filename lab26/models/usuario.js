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
            'CALL insertar_usuario(?, ?)', 
            [this.username, hashedPassword]
        );
    }
//Metodo estatico para buscar un usuario por su nombre de usuario
    static findByUsername(username) {
        return db.execute('SELECT * FROM usuarios WHERE username = ?', [username]);
    }
};