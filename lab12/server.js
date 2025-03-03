//CONFIGURACIÓN DE EXPRESS

//Importación de modulos
const express = require('express'); //Crear servidor en Node
const path = require('path'); //Modulo nativo de Node.js - se usa para manejar rutas de archivos

//Inicialización de express para app
const app = express();

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

//Rutas externas
const mainRoutes = require('./routes/pagina.routes.js'); //Carga archivo de la ruta definida, para definir las rutas de nuestra app
                          //Express no permite rutas relativas por ello requiere '/' en lugar de '\'
app.use(mainRoutes); //Hace que express las use

//Si el usuario intenta acceder a otra ruta que no existe se mostrara el mensaje correspondiente y codigo error 404
app.use((req, res) => {
    res.status(404).send("Pagina no encontrada");
});

app.listen(3000, () => { //Inicia servidor en puerto 3000
    console.log('Servidor corriendo en http://localhost:3000') //Muestra en terminal la url para abrir app en navegador
});