require('dotenv').config(); //Ayuda a proteger las contraseñas para no subirlas directamente al repo
const mysql = require('mysql2'); //Librería que permite interactuar con una base de datos

//Pool es un conjunto de conexiones reutilizables a la base de datos de la lb mysql2
const pool = mysql.createPool({
    host: process.env.DB_HOST, //Direccion del servidor de la BD
    user: process.env.DB_USER, //Usuario de la BD
    password: process.env.DB_PASSWORD, //Contraseña del usuario
    database: process.env.DB_NAME, //Nombre de la BD
    waitForConnections: true, //Espera a que haya una conexion disponible si el limite se alcanza
    connectionLimit: 10, //Numero máximo de conexiones en el pool
    queueLimit: 0 //Limite de solicitudes en cola (0 es sin limite)
});

module.exports = pool.promise(); //Convierte las operaciones de la bd en promesas