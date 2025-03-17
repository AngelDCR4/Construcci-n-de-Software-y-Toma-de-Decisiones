-- Crear Base de datos
CREATE DATABASE lab19;
USE lab19;

-- Crear tabla de mensajes
CREATE TABLE mensajes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    contenido TEXT NOT NULL,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

-- Usuario de prueba
INSERT INTO usuarios (username, password)
-- admin, 1234
VALUES ('admin', '$2b$12$Jx5roB/e/0ppBXRiDWhaq.1/3oCGUZn7oLzpJ8b6Osl8Ed6j4yAXm');

-- Otro usuario de prueba
INSERT INTO usuarios (username, password)
-- Angel, Holaxd
VALUES ('Angel', '$2b$12$rSNqQdqpBf.kzlETTWDUDO5QSsPLToH3qREBm2rmFnThZoTPClZnC');

/* Primero se crean las tablas normales sin FK
Ya que si creamos primero las de tablas N a N no tendran
los las llaves para relacionarse*/
CREATE TABLE roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE permisos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) UNIQUE NOT NULL
);

/* Aquí ya creamos las tablas N a N que ayudan a
relacionar usuarios con roles y con privilegios*/
CREATE TABLE usuario_roles (
    usuario_id INT,
    rol_id INT,
    PRIMARY KEY (usuario_id, rol_id),
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (rol_id) REFERENCES roles(id) ON DELETE CASCADE
);

CREATE TABLE rol_permisos (
    rol_id INT,
    permiso_id INT,
    PRIMARY KEY (rol_id, permiso_id),
    FOREIGN KEY (rol_id) REFERENCES roles(id) ON DELETE CASCADE,
    FOREIGN KEY (permiso_id) REFERENCES permisos(id) ON DELETE CASCADE
);

-- Insertamos algunos valores de prueba
INSERT INTO roles (nombre) VALUES ('admin'), ('usuario');
INSERT INTO permisos (nombre) VALUES ('ver_mensajes'), ('crear_mensajes'), ('eliminar_mensajes');
INSERT INTO rol_permisos (rol_id, permiso_id) VALUES
(1, 1), (1, 2), (1, 3), -- Admin puede ver, crear y eliminar mensajes
(2, 1), (2, 2); -- Usuario solo puede ver y crear mensajes
INSERT INTO lab19.usuario_roles (usuario_id, rol_id) VALUES 
(1,1), -- Admin con rol de admin
(2,2); -- Usuario con rol de usuario

-- Consultar los usuarios con sus roles y permisos
SELECT u.id, u.username, r.nombre AS rol, p.nombre AS privilegio
FROM usuario_roles ur
JOIN usuarios u ON ur.usuario_id = u.id
JOIN roles r ON ur.rol_id = r.id
JOIN rol_permisos rp ON rp.rol_id = r.id 
JOIN permisos p ON p.id = rp.permiso_id;

