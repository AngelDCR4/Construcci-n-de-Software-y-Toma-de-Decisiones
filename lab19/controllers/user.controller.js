//De momento la autentenficación es estatica entonces la cambiaremos
//por una con BD

//Definicion de donde esta el modelo o clase Usuario
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');

exports.get_login = (req, res) => {
    res.render('login.ejs', { titulo: 'Login'});
};

//Manejo de login por base de datos
exports.post_login = async (req, res) => {
    const {username, password} = req.body;

    try {
        //Buscamos si el usuario existe en BD
        const [usuarios] = await Usuario.findByUsername(username);
        //Si no existe manda error
        if (usuarios.length === 0) {
            return res.send("<h1>Usuario o contraseña incorrecto <a href='/login'>Intentar de nuevo</a> </h1>");
        }

        const usuario = usuarios[0]; //Extraemos el primer usuario encontrado (la consulta regresa array)
        //Comparamos contraseña ingresada con la almacenada en la BD
        const doMatch = await bcrypt.compare(password, usuario.password); 

        //Si las contraseñas coinciden iniciamos sesion
        if(doMatch) {
            //Obtener los roles y permisos del usuario desde la BD 
            const [rolesPermisos] = await Usuario.getRolesAndPermissions(usuario.id)

            req.session.user = usuario; //Guardamos datos de usuario
            req.session.isLoggedIn = true; //Marcamos como autenticado
            //Guardamos el rol del usuario en un array para su uso durante la sesion
            req.session.roles = rolesPermisos.map(rp => rp.rol)
            //Guardamos los permisos del usuario en un array para su uso durante la sesion
            req.session.permisos = rolesPermisos.map(rp => rp.permiso)
            
            //Imprimir los permisos de acuerdo al tipo de usuario
            console.log("Roles en sesión:", req.session.roles);
            console.log("Permisos en sesión:", req.session.permisos);
            
            // Guardamos la sesion y redirigimos a la págima de mensajes
            return req.session.save(err => {
                res.redirect('/mensajes');
            });
        }
        //Si no concuerda mostramos error
        res.send("<h1>Usuario o contraseña incorrecto <a href='/login'>Intentar de nuevo</a> </h1>")

    } catch (error) {
        console.error("Error en login:", error);
        res.status(500).send("Error en login");
    }
};

//Controlador de logout
exports.logout = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/login'); //Redirigir a login despues de cerrar sesion
    }); 
};