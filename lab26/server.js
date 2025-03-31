//CONFIGURACIÓN DE EXPRESS

//Importación de modulos
const express = require('express'); //Crear servidor en Node
const path = require('path'); //Modulo nativo de Node.js - se usa para manejar rutas de archivos
const bodyParser = require('body-parser'); //BodyParser permite interpretar datos enviados en formularios HTML por peticiones POST
const session = require('express-session'); //Permite manejar sesiones en la aplicación para que los datos persistan en diferentes peticiones del usuario
const cookieParser = require('cookie-parser'); //Permite leer y escribir cookies en el navegador

//Inicialización de express para app
const app = express();

//Permite que Express procese datos de formulario
//extended:false indica que solo acepta datos como strings o arrays simples
app.use(bodyParser.urlencoded({extended:false}));

//Activación de cookie parser en la app
app.use(cookieParser());

//Configuración de manejo de sesiones
app.use(session({
    secret: 'string_secreto', //Clave secreta para firmar la sesión y evitar manipulaciones
    resave: false, //no se guarda la sesion en cada petición si no ha sido modificada
    saveUninitialized:false //No guarda las sesiones vacias (osea sin datos)
}));

//Configuración de EJS para plantillas
app.set('view engine', 'ejs'); //Indicación de uso de EJS para renderizar HTML dinamico

/*__dirname
 - devuelve la direccion de la ruta del archivo actual
 - path.join construye rutas de archivos de forma segura
 - Evita problema con diferentes sistemas operativos
 - Es útil para manejar archivos estáticos y vistas HTML
*/
app.set('views', path.join(__dirname, 'views')); //Definir vistas .ejs estaran dentro de views

//Archivos estaticos
app.use(express.static(path.join(__dirname, 'public')));
//Indicamos que archivos estaticos estaran dentro de la carpeta public
//express.static() indica que archivos css, imágenes y scripts JS sin necesidad de crear rutas manuales
//Dentro de la carpeta public se manejan archivos accesibles para todo el navegador

/*MIDDLEWARE
 - Funcion de express que se ejecuta antes de que una solicitud llegue
    Se puede decir como seríe de filtros o procesos que se ejecutan antes de responder a cliente
 - Ejemplos de Middleware:
    -> express.urlencoded({ extended: true}) - Cuando se manda un formulario en post express no
        puede leerlo, entonces se usa este middleware para que express lo entienda
    -> express.json()
 - Los middleware son esenciales para modificar, validad y procesar datos 
    antes de enviarlos a la respuesta final
*/

app.use(express.urlencoded({extended: true})); //Permite que express lea datos enviados en forms POST


app.use((req, res, next) => {
    res.locals.session = req.session;
    next();
});


//Rutas externas
const paginaRoutes = require('./routes/pagina.routes.js'); //Carga archivo de la ruta definida, para definir las rutas de nuestra app
                          //Express no permite rutas relativas por ello requiere '/' en lugar de '\'
const infoRoutes = require('./routes/info.routes.js')

const userRoutes = require('./routes/user.routes.js');

const calendarRoutes = require('./routes/calendar.routes');

app.use(paginaRoutes); //Hace que express las use
app.use(infoRoutes)
app.use(userRoutes);
app.use(calendarRoutes);

//Si el usuario intenta acceder a otra ruta que no existe se mostrara el mensaje correspondiente y codigo error 404
app.use((req, res) => {
    res.status(404).send("Pagina no encontrada");
});

app.listen(3000, () => { //Inicia servidor en puerto 3000
    console.log('Servidor corriendo en http://localhost:3000') //Muestra en terminal la url para abrir app en navegador
});