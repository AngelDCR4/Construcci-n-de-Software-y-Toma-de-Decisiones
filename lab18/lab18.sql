-- Crear Base de datos
CREATE DATABASE lab18;
USE lab18;

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
-- Insertar resultado de test_hash -> 1234
UPDATE usuarios 
SET password = '$2b$12$Jx5roB/e/0ppBXRiDWhaq.1/3oCGUZn7oLzpJ8b6Osl8Ed6j4yAXm'
WHERE username = 'admin';
-- Otro usuario de prueba
INSERT INTO usuarios (username, password)
-- Angel, Holaxd
VALUES ('Angel', '$2b$12$rSNqQdqpBf.kzlETTWDUDO5QSsPLToH3qREBm2rmFnThZoTPClZnC');
