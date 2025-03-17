

//Middleware de autorizacion para verificar roles y permisos
module.exports = (rolRequerido, permisoRequerido) => {
    return (req, res, next) => {
        if (!req.session.user) {
            return res.redirect('/login'); //Redirigir si no esta autenticado
        }
        //Extraer rol y permiso del usuario dentro de la sesion
        const { roles, permisos } = req.session;

        //Imprimir valores guardados del Middleware
        console.log("Middleware - Roles en sesión:", roles);
        console.log("Middleware - Permisos en sesión:", permisos);
        console.log("Rol requerido:", rolRequerido, "Permiso requerido:", permisoRequerido);

         //Verificar si el usuario tiene el rol necesitado
         if (!roles.includes(rolRequerido)) {
            return res.status(403).send('<h1>Acceso denegado: No tienes el rol necesario</h1>'); 
        }

        //Verificar si el usuario tiene el permiso necesitado
        if (!permisos.includes(permisoRequerido)) {
            return res.status(403).send('<h1>Acceso denegado: No tienes permiso</h1>'); 
        }
        //Si tiene el rol y permiso, permite el acceso
        next();
    };
};
