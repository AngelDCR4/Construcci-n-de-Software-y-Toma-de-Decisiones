
// Controlador para manejar la subida de archivos
exports.get_formularioArchivo = (req, res) => {
    res.render('archivo-form', { titulo: 'Subir Archivo' });
};

exports.postArchivo = (req, res) => {
    const archivo = req.file;

    if (!archivo) {
        return res.send('<h1>No se subió ningún archivo</h1>');
    }

    //Ruta del archivo subido
    const ruta_archivo = archivo.path;

    res.send(`<h1>Archivo subido correctamente</h1><p>Ruta: ${ruta_archivo}</p>`);
};
