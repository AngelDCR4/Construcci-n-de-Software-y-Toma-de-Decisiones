-- INSERT INTO usuarios (username, password) VALUES (?, ?)
/*
CREATE PROCEDURE insertar_usuario (
    IN p_username VARCHAR(50),
    IN p_password VARCHAR(255)
)
BEGIN
    INSERT INTO usuarios (username, password)
    VALUES (p_username, p_password);
END; */

-- INSERT INTO mensajes (nombre, contenido) VALUES (?, ?)

/*
CREATE PROCEDURE insertar_mensaje (
    IN p_nombre VARCHAR(100),
    IN p_contenido TEXT
)
BEGIN
    INSERT INTO mensajes (nombre, contenido)
    VALUES (p_nombre, p_contenido);
END; */

-- SELECT * FROM mensajes

/*
CREATE PROCEDURE obtener_mensajes()
BEGIN
    SELECT * FROM mensajes;
END; */
