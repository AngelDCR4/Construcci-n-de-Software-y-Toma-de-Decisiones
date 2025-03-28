const express = require('express');
const router = express.Router();
const archivoController = require('../controllers/archivoController');

router.get('/subir', archivoController.get_formularioArchivo);
router.post('/archivo', archivoController.postArchivo);

module.exports = router;
