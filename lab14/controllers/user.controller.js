exports.get_login = (req, res) => {
    res.render('login.ejs', { titulo: 'Login'});
};

//Manejo de login
exports.post_login = (req, res) => {
    const {username, password} = req.body;

    //USUARIOS DE PRUEBA
    const users = [
        { username: "admin", password: "1234" },
        { username: "user", password: "abcd" }
    ];

    //VERIFICADOR DE USUARIO
    const user = users.find(u => u.username === username && u.password === password);

    if(user) {
        req.session.user = user; //guardar usuario en sesion
        res.redirect('/mensajes'); //Redirigir a página de mensajes

    } else {
        res.send("<h1>Usuarios o contraseña incorrectos<a href='/login'>Intentar de nuevo</a></h1>")
    }
};

exports.logout = (req, res) => {

        res.redirect('/login'); //Redirigir a login despues de cerrar sesion
};